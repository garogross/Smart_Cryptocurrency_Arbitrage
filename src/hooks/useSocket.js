import {useEffect} from "react";
import {useSelector} from "react-redux";
import {subscriptionTypes} from "../constants";

export const useSocket = (onMessageReceived,onRequestData) => {
    const user = useSelector(state => state.auth.user)
    const autoRefresh = useSelector(state => state.arbitrage.autoRefresh)

    useEffect(() => {

        const socket = new WebSocket('ws://116.202.58.43:8543');

        if(user) {
            if(user.subscription === subscriptionTypes.arb && autoRefresh) {
                socket.addEventListener('open', (event) => {
                    const subscribeMessage = {
                        event: 'subscribe',
                        id: user.id
                    };

                    socket.send(JSON.stringify(subscribeMessage));
                });

                socket.addEventListener('message', (event) => {
                    if(JSON.parse(event.data).data) onMessageReceived(JSON.parse(event.data).data)
                });

                socket.addEventListener('close', (event) => {
                    console.dir('WebSocket connection closed:');
                });

                socket.addEventListener('error', (event) => {
                    console.error('WebSocket error:', event);
                });
            } else {
                onRequestData()
            }

            if(user.subscription === subscriptionTypes.arb && !autoRefresh) {
                socket.close();
            }

        }

        return () => {
            socket.close();
        };

    }, [user,autoRefresh]);
}