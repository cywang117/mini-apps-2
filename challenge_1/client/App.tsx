import * as React from 'react';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalStyle, Title, ErrorMessage } from './styles';
import { debounce } from './utils';
import EventList, { EventDef } from './EventList';
import Search from './Search';

/**
 * COMPONENT
 */
const App:FC = () => {
  const [numEvents, setNumEvents] = useState<number>(0);
  const [events, setEvents] = useState<Array<EventDef>>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const isInitialMount = useRef<boolean>(true);

  const defaultErrorMsg = 'Oops! Something went wrong. Try refreshing the page.';
  const invalidSearchMsg = 'No events found for search phrase. Try again.';

  /**
   * Get the total number of events that fit an optional search phrase query
   * @param {String} searchPhrase
   * @returns {Promise}
   */
  const getEventCount = (searchPhrase?:string) => {
    let endpoint = `/events${(searchPhrase && `?q=${searchPhrase}`) || ''}`;
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setNumEvents(data.length);
        return data.length;
      })
  }

  /**
   * Fetch events at the given endpoint, then set current state equal to the response json
   * @param {String} endpoint
   * @returns {Promise}
   */
  const fetchEvents = (endpoint:string) => {
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setErrorMsg('');
        setEvents(data);
      });
  }

  /**
   * Fetch a new page of events with optional search query. Called when page number changes in any way (except when searching)
   */
  const fetchEventPage = () => {
    let endpoint = `/events?_page=${pageNum}${(searchPhrase && `&q=${searchPhrase}`) || ''}`;
    fetchEvents(endpoint)
      .catch((err) => {
        console.error(err);
        setErrorMsg(defaultErrorMsg);
        setEvents([]);
      });
  }

  /**
   * Fetch a new set of events that fit a query. Gets event count beforehand in order to update react-paginate display.
   * @param {String} searchPhrase
   */
  const fetchEventQuery = (searchPhrase:string) => {
    setIsSearching(true);
    getEventCount(searchPhrase)
      .then(numEvents => {
        if (!numEvents) throw new Error(invalidSearchMsg);
      })
      .then(() => fetchEvents(`/events?_page=1&q=${searchPhrase}`))
      .then(() => {
        setPageNum(1);
        setIsSearching(false);
      })
      .catch(err => {
        console.error(err);
        if (err.message === invalidSearchMsg) {
          setErrorMsg(invalidSearchMsg);
        } else {
          setErrorMsg(defaultErrorMsg);
        }
        setIsSearching(false);
        setEvents([]);
      });
  }

  /**
   * Debounces fetchEventQuery to run after 500ms wait. useCallback is used to keep
   * the same reference to the initially returned debounce fn between renders
   */
  const debouncedSearch = useCallback(debounce(fetchEventQuery, 500), []);

  /**
   * Update page number on react-paginate page change event
   * @param {Object} selectedItem: the page object returned by react-paginate
   * @param {Number} selectedItem.selected: the 0-indexed selected page
   */
  const handlePageChange = (selectedItem:{ selected: number }) => {
    // Selected value seems to be 0-indexed, whereas json-server's pagination is 1-indexed
    setPageNum(selectedItem.selected + 1);
  }

  /**
   * Update searchPhrase on input change in Search component
   * @param {React.ChangeEvent} e: synthetic React event fired on HTMLElement change
   */
  const handleSearchChange = (e: React.ChangeEvent) => {
    setSearchPhrase((e.target! as HTMLInputElement).value);
  }

  /**
   * On initial app render, get total event count, then fetch first page.
   */
  useEffect(() => {
    getEventCount()
      .then(() => fetchEventPage())
      .catch(err => {
        console.error(err);
        setErrorMsg(defaultErrorMsg);
      });
  }, []);

  /**
   * On page number (n) change, fetch nth event page with server-side pagination query.
   */
  useEffect(() => {
    if (!isInitialMount.current && !isSearching) {
      fetchEventPage();
    }
  }, [pageNum]);

  /**
   * On search phrase update, fetch events that match the search phrase using server-side full-text search.
   * The search is debounced for server load reduction.
   */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      debouncedSearch(searchPhrase);
    }
  }, [searchPhrase]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Title>Historical Events Finder</Title>
      <Search
        searchPhrase={searchPhrase}
        handleSearchChange={handleSearchChange}
        resetSearch={() => setSearchPhrase('')}
      />
      <ErrorMessage>{errorMsg}</ErrorMessage>
      {
        events.length ? (
          <React.Fragment>
            <ReactPaginate
              previousLabel={'Prev'}
              previousLinkClassName={'page-change-btn'}
              nextLabel={'Next'}
              nextLinkClassName={'page-change-btn'}
              pageCount={Math.ceil(numEvents / 10)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              forcePage={pageNum - 1}
              onPageChange={handlePageChange}
              containerClassName={'paginate-ctn'}
              activeLinkClassName={'active'}
              pageLinkClassName={'page'}
            />
            <EventList events={events} />
          </React.Fragment>
        ) : ''
      }
    </React.Fragment>
  );
}

export default App;
