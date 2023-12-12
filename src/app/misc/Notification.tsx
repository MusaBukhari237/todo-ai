'use client';

export default function Notification(type = "info", message: string) {

    const notificationTypes: any = {
        info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        success: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    }
    const notificationsContainer = (document.getElementById("notifications") as HTMLElement);

    if (notificationsContainer) {

        const id = Math.round(Math.random() * 10000000000);
        const notification: any = `<div role="alert" class="notification notification-${type} alert alert-${type}" id="notification_${id}">
            ${notificationTypes[type]}
            <span title="${message}" class='truncate'>${message}</span>
             <button class="btn btn-circle btn-ghost" onClick="this.parentElement.remove();" >✕</button>
             <br/>
        </div>`;

        setTimeout(() => {
            const notificationItem: any = document.getElementById(`notification_${id}`);
            console.log(notificationItem);
            notificationItem.classList.add("run");
            setTimeout(() => {
                console.log(notificationItem);
                notificationItem.querySelector("button").click();
            }, 4000);
        }, 500);

        notificationsContainer.innerHTML += notification;
    }

}


