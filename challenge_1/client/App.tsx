import * as React from 'react';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalStyle, Title } from './styles';
import EventList, { EventDef } from './EventList';
import Search from './Search';

/**
 * UTILS
 */

 /**
  * Debounce: delays function execution until input ms have passed
  * @param {Function} func
  * @param {Number} wait
  * @returns {Function}
  */
const debounce = <F extends ((...args: any) => any)>(
  func: F,
  wait: number
) => {
  let timeout: number = 0;

  const debouncedFn = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }

  return debouncedFn as (...args: Parameters<F>) => ReturnType<F>;
}

/**
 * COMPONENT
 */
const App:FC = () => {
  const [numEvents, setNumEvents] = useState<number>(0);
  const [events, setEvents] = useState<Array<EventDef>>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const isInitialMount = useRef(true);

  const getEventCount = (searchPhrase?:string) => {
    let endpoint = `/events${(searchPhrase && `?q=${searchPhrase}`) || ''}`;
    console.log(endpoint);
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setNumEvents(data.length))
      .catch((err) => {
        console.error(err);
      });
  }

  const fetchEvents = (endpoint:string) => {
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
        setEvents([]);
      });
  }

  const fetchEventPage = () => {
    let endpoint = `/events?_page=${pageNum}${(searchPhrase && `&q=${searchPhrase}`) || ''}`;
    fetchEvents(endpoint);
  }

  const fetchEventQuery = (searchPhrase:string) => {
    setIsSearching(true);
    getEventCount(searchPhrase)
      .then(() => fetchEvents(`/events?_page=1&q=${searchPhrase}`))
      .then(() => {
        setPageNum(1);
        setIsSearching(false);
      })
      .catch(err => {
        console.error(err);
        setIsSearching(false);
      })
  }

  const debouncedSearch = useCallback(debounce(fetchEventQuery, 500), []);

  const handlePageChange = (selectedItem:{ selected: number }) => {
    // Selected value seems to be 0-indexed, whereas json-server's pagination is 1-indexed
    setPageNum(selectedItem.selected + 1);
  }

  const handleSearchChange = (e: React.ChangeEvent) => {
    setSearchPhrase((e.target! as HTMLInputElement).value);
  }

  useEffect(() => {
    getEventCount()
      .then(() => fetchEventPage())
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isInitialMount.current && !isSearching) {
      fetchEventPage();
    }
  }, [pageNum]);

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
  );
}

export default App;
