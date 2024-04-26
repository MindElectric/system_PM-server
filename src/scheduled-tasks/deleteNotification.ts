import cron from "node-cron"
import { Op } from "sequelize"
import Notification from "../model/Notifications.model"

export const deleteNotificationJob = () => {
    cron.schedule('* * * * *', function () {

        console.log('running a task every minute');

        Notification.destroy({
            where: {
                createdat: {
                    // Sequelize.Op is the symbol-based operators for better security
                    [Op.lt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) // 24 hours ago
                    // [Op.lt]: new Date(new Date().getTime() - 60 * 1000) // 1 minute ago
                }
            }
        })
            .then((deletedRecords: number) => {
                console.log('Deleted ' + deletedRecords + ' old notifications');
            })
            .catch((err: Error) => {
                console.log('Error deleting old notifications');
                console.log(err);
            });

    })
};
