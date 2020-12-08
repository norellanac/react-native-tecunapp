import React, { Component } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Image, Dimensions } from "react-native";
import { Spinner, CardItem, Container, Text } from "native-base";

var screenWidth = Dimensions.get("window").width - 200;
var hg = Dimensions.get("window").width - 200;
export default class Loading extends Component {
  render() {
    return (
      <Container>
        <CardItem cardBody>
          <Grid>
            <Col style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 125,
                  fontSize: 20,
                  color: "#EF5F2F",
                  fontWeight: "bold",
                }}
              >
                Cargando información...
              </Text>
            </Col>
          </Grid>
        </CardItem>
        <CardItem cardBody>
          <Grid style={{ marginTop: 5 }}>
            <Col size={4} style={{ alignItems: "center" }}>
              <CardItem cardBody>
                <Grid style={{ marginTop: 50 }}>
                  <Col size={4} style={{ alignItems: "center" }}>
                  <Image
                      source={{uri: "http://157.55.181.102/img/not-found.png"}}
                      style={{ width: screenWidth-20, height: 165 }}
                    />
                  </Col>
                </Grid>
              </CardItem>

              <Spinner color="red" />
            </Col>
          </Grid>
        </CardItem>
      </Container>
    );
  }
}
