import React, {useState, useEffect} from 'react';
import {Container, ImageWrap, TouchWrap} from '../helper';

import {Colors, RF, RR, RW} from '../helper/constants';
import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  SafeAreaView,
  View,
} from 'react-native';
import {H1, H2, P, PL, Pr} from '../helper/element';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../helper/fontSize';
import {Image} from 'react-native';
import {AppIcons} from '../helper/images';
import ImageBlurShadow from 'react-native-image-blur-shadow';
import NumberFormat from 'react-number-format';
export const BigCard = props => {
  let name = `${props.name}`;
  if (name.length > 16) {
    name = `${name.slice(0, 16)}...`;
  }

  const {width, height} = Dimensions.get('window');
  return (
    <TouchWrap onPress={props.onPress}>
      <Container
        height={8}
        // backgroundColor={Colors.appBackground}
        direction={'row'}
        width={90}
        marginTop={props.index == 0 ? 1.5 : -0.5}>
        <Container height={8} direction={'row'}>
          <Container height={8} paddingLeft={0} verticalAlignment={'center'}>
            <View
              style={{
                width: 50,

                justifyContent: 'center',
                alignItems: 'center',
                shadowOffset: {
                  width: 9,
                  height: 9,
                },
                shadowOpacity: 0.12,
                // elevation: 5,
                shadowRadius: 10,
                borderRadius: RR(0),
              }}>
              <Image
                style={{
                  height: 43,
                  width: 43,
                  zIndex: 100,
                  borderRadius: RR(50),
                }}
                source={
                  props.image
                    ? {
                        uri: props.image,
                      }
                    : props.local
                }
                resizeMode={'cover'}
              />
            </View>
          </Container>
        </Container>

        <Container
          height={8}
          width={66}
          paddingRight={2}
          marginLeft={3}
          paddingLeft={0}
          verticalAlignment={'center'}>
          <Container direction={'row'} horizontalAlignment={'space-between'}>
            <Container direction={'row'}>
              <Container direction={'row'} width={50}>
                <P color={Colors.appBlack} size={13}>
                  {name}
                </P>
              </Container>
              <Container
                marginLeft={1}
                verticalAlignment={'center'}
                horizontalAlignment={'center'}>
                {props.verified ? (
                  <Image
                    style={{height: RF(15), width: RF(15)}}
                    source={AppIcons.Verified}
                  />
                ) : null}
              </Container>
            </Container>
            <Container width={20}>
              <Container>
                <NumberFormat
                  value={props.amount}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'\u20A6'}
                  fixedDecimalScale={true}
                  decimalScale={0}
                  renderText={formattedValue => (
                    <P
                      textAlign="right"
                      color={
                        props.status == 'credit' ? '#0EAD69' : Colors.countRed
                      }
                      size={8}>
                      {formattedValue}
                    </P>
                  )} // <--- Don't forget this!
                />
              </Container>
              <Container marginTop={0.8}>
                <PL textAlign="right" color={Colors.appBlack} size={8}>
                  {props.handle}
                </PL>
              </Container>
            </Container>
          </Container>

          <Container marginTop={-1} width={40}>
            <PL color={'#636263'} size={10}>
              {props.time}
            </PL>
          </Container>
        </Container>
        {/* <Container
          height={12}
          width={16}
          paddingVertical={1}
          horizontalAlignment={'center'}>
          <Container>
            <P color={'#636263'} size={10}>
              {props.time}
            </P>
          </Container>
        </Container> */}
      </Container>
    </TouchWrap>
  );
};
