import classNames from "classnames";
import { useEffect, useState } from "react";

import css from "./index.module.scss";

import EventCard from "../EventCard";
import Loader from "../../../../components/Loader";

import EventStore from "../../../../stores/EventStore";

const EventCards = () => {
    const [isFetching, setIsFetching] = useState(true);
    const events = EventStore.get();

    useEffect(() => {
        const getEvents = async () => {
            await EventStore.getAsync("");
            setIsFetching(false);
        };

        void getEvents();
    }, []);

    if (isFetching) {
        return <Loader />;
    }

    return (
        <div className={classNames(css.wrapper)}>
            <div className={classNames(css.border)}></div>

            <div className={classNames(css.items)}>
                {events.map((event) => {
                    return <EventCard key={event.id} event={event} />;
                })}
            </div>
        </div>
    );
};

export default EventCards;
