import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useState,JSX } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colorpallet } from '../color/color';


interface ArrayLabel{
    key:string,
    title:string
}
interface Props{
    routes:ArrayLabel[],
    firstRoute:() => JSX.Element,
    secondRoute:()=>JSX.Element

}

const Tabs = ({routes,firstRoute,secondRoute}:Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);


  
  const renderScene = SceneMap({
    first: firstRoute,
    second: secondRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: colorpallet.primary }} />
        )}
      />
    </View>
  );
};

export default Tabs;
