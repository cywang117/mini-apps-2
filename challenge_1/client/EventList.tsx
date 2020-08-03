import * as React from 'react';
import { FC } from 'react';
import { EventsCtn, Event, EventYear, EventDesc } from './styles';

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
}

interface Props {
  events: Array<EventDef>;
}

const EventList:FC<Props> = ({ events }) => {
  return (
    <EventsCtn>
      {
        events.map((event, idx) => (
          <Event key={idx}>
            <EventYear>Date: {event.date}</EventYear>
            <EventDesc>{event.description}</EventDesc>
          </Event>
        ))
      }
    </EventsCtn>
  );
}

export default EventList;
