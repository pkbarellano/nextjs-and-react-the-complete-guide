import { getFeaturedEvents } from "../dummy-data";
import EventList from '../components/events/event-list';

function HomePage() {
    const featruredEvents = getFeaturedEvents();

    return (
        <div>
            <EventList items={featruredEvents} />
        </div>
    );
};

export default HomePage;