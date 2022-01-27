import { useState } from "react";
import { Image } from "react-native";
import { Col } from "react-native-easy-grid";
import {
  Text,
  Card,
  CardItem,
  Button,
  Icon,
} from "native-base";
import { apiUrl, myStyles } from "./../../App";

export interface AlertState {
  message: string | null;
  color: string | null;
  isShowMessage: boolean;
}

export const useAlert = ({ message, color, isShowMessage }: AlertState) => {
  const [isShow, setIsShow] = useState(isShowMessage);

  const onChangeAlert = (value: boolean) => {
    setIsShow(value);
  };

  const displayAlert = () => {
    if (message && isShowMessage) {
      return (
        <Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
          <CardItem style={{ backgroundColor: color  }}>
            <Image
              source={{ uri: `${apiUrl.link}/img/not-found.png` }}
              style={{ width: 25, height: 25 }}
            />
            <Col size={4}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              ></Text>
            </Col>
            <Button
              onPress={() => onChangeAlert(false)}
              transparent
              rounded
            >
              <Icon name="close" />
            </Button>
          </CardItem>
        </Card>
      );
    }
  };
  return {
    isShow,
    onChangeAlert,
    displayAlert,
  };
};
