import React from 'react';
import moment from 'moment-timezone';



const TimeDisplay = ({ createdAt }: { createdAt: string | Date }) => {
      const userTimeZone = moment.tz.guess();
      const createdAtLocal = moment(createdAt).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss');

      return (
            <p className="flex">
                <span className="text-sm">Completed at: {createdAtLocal}</span>
            </p>

      );
};

export default TimeDisplay;
