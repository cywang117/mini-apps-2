import * as React from 'react';
import { FC, useState, useEffect, useRef } from 'react';
import { Event, EventHeaderCtn, EventYear, EventDesc } from './styles';

export type UpdateEventFn = (eventId:number, updatedEvent:{date:string, desc:string}) => any;

interface Props {
  id: number;
  date: string;
  desc: string;
  eventId: number;
  updateEvent: UpdateEventFn;
}

const SingleEvent:FC<Props> = ({ id, date, desc, eventId, updateEvent }) => {
  const [eventDate, setEventDate] = useState<string>('');
  const [eventDesc, setEventDesc] = useState<string>('');

  const isInitialMount = useRef<boolean>(true);

  /**
   * On focusing out of an editable field in event component, update state to reflect edits
   * @param {Event} e
   */
  const handleEditBlur = (e:React.FocusEvent, updatedField:string) => {
    updatedField === 'date' && setEventDate((e.target as HTMLDivElement).textContent || '');
    updatedField === 'desc' && setEventDesc((e.target as HTMLDivElement).textContent || '');
  }

  /**
   * On initial mount, set local state for date and description to track editable field changes
   */
  useEffect(() => {
    setEventDate(date);
    setEventDesc(desc);
  }, []);

  /**
   * On editable field update, update the server data
   */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (eventDesc !== desc || eventDate !== date) {
      updateEvent(eventId, { date: eventDate, desc: eventDesc })
    }
  }, [eventDate, eventDesc]);

  return (
    <Event>
      <EventHeaderCtn>
        <EventYear>
          Date:
          <div
            contentEditable
            suppressContentEditableWarning={true}
            spellCheck="false"
            onBlur={(e) => { handleEditBlur(e, 'date'); }}
          >
            {eventDate}
          </div>
        </EventYear>
      </EventHeaderCtn>
      <EventDesc
        contentEditable
        id={`event-desc-${id}`}
        onBlur={(e) => { handleEditBlur(e, 'desc'); }}
        suppressContentEditableWarning={true}
        spellCheck="false"
      >
        {eventDesc}
      </EventDesc>
    </Event>
  );
}

export default SingleEvent;
