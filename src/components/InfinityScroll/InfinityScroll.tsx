

import * as React from "react";
import {
  FlatList,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native";
import { colorpallet } from "../color/color";

export type InfintyScrollType<T> = {
  item: T;
};

type InfinityScrollProps<T> = {
  Component: React.FunctionComponent<InfintyScrollType<T>> | any;
  data: T[];
  getMoreData?: () => void;
  showsVerticalScrollIndicator?: boolean;
  SeparatorComponent?: React.FunctionComponent<any>;
  FooterComponent?: React.FunctionComponent<any>;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showSpinner?: boolean;
  horizontal?:boolean
  onRefreshs?: () => void;
};

export const InfinityScroll = <T extends unknown>({
  Component,
  data,
  SeparatorComponent,
  FooterComponent,
  getMoreData,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showSpinner = false,
  horizontal,
  onRefreshs
}: InfinityScrollProps<T>): JSX.Element => {
  const renderCell = ({
    index,
    style,
    ...props
  }: {
    index: number;
    style: StyleProp<ViewStyle>;
  }) => {
    return <View style={{ zIndex: -index }} {...props} />;
  };

  const [refresh, setRefreshing] = React.useState<boolean>(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefreshs && onRefreshs(); // Usar la función proporcionada por la prop
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <FlatList
        style={style}
        data={data}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <Component item={item} />}
        keyExtractor={(_item, index) => String(index)}
        ItemSeparatorComponent={SeparatorComponent}
        ListFooterComponent={FooterComponent}
        horizontal={horizontal}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh} />
        }
        onEndReached={({ distanceFromEnd }) => {

          if (distanceFromEnd < 0) return;
          getMoreData && getMoreData();
        }}
        CellRendererComponent={renderCell}
      />
      {showSpinner && <ActivityIndicator size="small" color={colorpallet.orange} />}
    </>
  );
};
