import * as React from 'react';
import { FC } from 'react';
import { EventsCtn } from './styles';
import SingleEvent, { UpdateEventFn } from './SingleEvent';

/**
 * Counts of categories in all events:
 * {
 *  category1: 36984,
 *  category2: 9586,
 *  date: 37859,
 *  description: 37859,
 *  granularity: 37859,
 *  lang: 37859
 * }
 */

export interface EventDef {
  date: string;
  description: string;
  granularity: string;
  lang: string;
  category1?: string;
  category2?: string;
  id: number;
}

interface Props {
  events: Array<EventDef>;
  updateEvent: UpdateEventFn;
}

const EventList:FC<Props> = ({ events, updateEvent }) => {
  return (
    <EventsCtn>
      {events.map((event, idx) => (
        <SingleEvent
          key={idx}
          id={idx}
          date={event.date}
          desc={event.description}
          eventId={event.id}
          updateEvent={updateEvent}
        />
      ))}
    </EventsCtn>
  );
}

export default EventList;
