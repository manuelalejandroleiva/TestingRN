// useGoBack.js or useGoBack.ts
import { useCallback } from 'react';

import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import { navigates } from '@/RootNavigation';
import { useAppSelector } from '../store/hooks /hooks';
import { RootState } from '../store/store';



const useGoBack = () => {
    const data = useAppSelector((state: RootState) => state.RouteSlice);
    const navigation=useNavigation()
    const route = useRoute();
    

    const handlegoBack = useCallback(async () => {
        if (data.routes.length > 0) {
            const currentRouteName = route.name; // Assuming you have route.name available
            const index = data.routes.indexOf(currentRouteName);
            if (index !== -1 && index > 0) {
                const previousRoute = data.routes[index - 1]; // Get the previous route
                navigates(previousRoute);
            }
        }
    }, [data, route]);


    const toggleDrawers = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return { handlegoBack,toggleDrawers };
};

export default useGoBack;