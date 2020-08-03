import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalStyle, Title } from './styles';
import EventList, { EventDef } from './EventList';
import Search from './Search';

/**
 * COMPONENT
 */
const App:FC = () => {
  const [numEvents, setNumEvents] = useState<number>(0);
  const [events, setEvents] = useState<Array<EventDef>>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  const fetchEventsPage = (page:number) => {
    fetch(`/events?_page=${page}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
        setEvents([]);
      });
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    // Selected key seems to be 0-indexed, whereas json-server's pagination is 1-indexed
    console.log(selectedItem.selected);
    setPageNum(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetch('/events')
      .then(res => res.json())
      .then(data => setNumEvents(data.length))
      .catch(err => {
        console.error(err);
      });

    fetchEventsPage(pageNum);
  }, []);

  useEffect(() => {
    fetchEventsPage(pageNum);
  }, [pageNum]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Title>Historical Events Finder</Title>
      <Search />
      <ReactPaginate
        previousLabel={'Prev'}
        previousLinkClassName={'page-change-btn'}
        nextLabel={'Next'}
        nextLinkClassName={'page-change-btn'}
        pageCount={Math.ceil(numEvents / 10)}
        initialPage={1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'paginate-ctn'}
        activeLinkClassName={'active'}
        pageLinkClassName={'page'}
      />
      <EventList events={events} />
    </React.Fragment>
  );
}

export default App;
