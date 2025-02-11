import { Dimensions } from "react-native"

export const Colors = {
    blackColor: '#000000',
    whiteColor: '#FFFFFF',
    primaryColor: '#000000',
    grayColor: '#8A9CBF',
    bgColor: '#F9FAFC',
    pinkColor: '#A9A9A9',
    lightPinkColor: '#C0C0C0',
    greenColor: '#4CAF50',
    blueColor: '#42A5F5',
    purpleColor: '#AB47BC',
    cyanColor: '#26A69A',
}

export const Fonts = {

    blackColor13Regular: {
        color: Colors.blackColor,
        fontSize: 13.0,
        fontFamily: 'Roboto_Regular'
    },

    blackColor14Regular: {
        color: Colors.blackColor,
        fontSize: 14.0,
        fontFamily: 'Roboto_Regular'
    },

    blackColor15Regular: {
        color: Colors.blackColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Regular'
    },

    blackColor16Regular: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Regular'
    },

    blackColor15Medium: {
        color: Colors.blackColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Medium'
    },

    blackColor16Medium: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Medium'
    },

    blackColor17Medium: {
        color: Colors.blackColor,
        fontSize: 17.0,
        fontFamily: 'Roboto_Medium'
    },

    blackColor16Bold: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Bold'
    },

    blackColor17Bold: {
        color: Colors.blackColor,
        fontSize: 17.0,
        fontFamily: 'Roboto_Bold'
    },

    blackColor18Bold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'Roboto_Bold'
    },

    blackColor20Bold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'Roboto_Bold'
    },

    blackColor24Bold: {
        color: Colors.blackColor,
        fontSize: 24.0,
        fontFamily: 'Roboto_Bold'
    },

    whiteColor15Regular: {
        color: Colors.whiteColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Regular'
    },

    whiteColor15Medium: {
        color: Colors.whiteColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Medium'
    },

    whiteColor20Medium: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: 'Roboto_Medium'
    },

    whiteColor13Bold: {
        color: Colors.whiteColor,
        fontSize: 13.0,
        fontFamily: 'Roboto_Bold'
    },

    whiteColor16Bold: {
        color: Colors.whiteColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Bold'
    },

    whiteColor18Bold: {
        color: Colors.whiteColor,
        fontSize: 18.0,
        fontFamily: 'Roboto_Bold'
    },

    whiteColor20Bold: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: 'Roboto_Bold'
    },

    grayColor13Regular: {
        color: Colors.grayColor,
        fontSize: 13.0,
        fontFamily: 'Roboto_Regular'
    },

    grayColor14Regular: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: 'Roboto_Regular'
    },

    grayColor15Regular: {
        color: Colors.grayColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Regular'
    },

    grayColor16Regular: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Regular'
    },

    grayColor18Medium: {
        color: Colors.grayColor,
        fontSize: 18.0,
        fontFamily: 'Roboto_Medium'
    },

    grayColor16Bold: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Bold'
    },

    primaryColor14Regular: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'Roboto_Regular'
    },

    primaryColor15Medium: {
        color: Colors.primaryColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Medium'
    },

    primaryColor16Medium: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Medium'
    },

    primaryColor14Bold: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'Roboto_Bold'
    },

    primaryColor16Bold: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'Roboto_Bold'
    },

    primaryColor15Bold: {
        color: Colors.primaryColor,
        fontSize: 15.0,
        fontFamily: 'Roboto_Bold'
    },

    primaryColor18Bold: {
        color: Colors.primaryColor,
        fontSize: 18.0,
        fontFamily: 'Roboto_Bold'
    }
}

export const Sizes = {
    fixPadding: 10.0,
}

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const CommonStyles = {
    buttonShadow: {
        shadowColor: Colors.primaryColor,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
    }
}