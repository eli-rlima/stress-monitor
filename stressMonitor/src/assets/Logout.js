import {Svg, Image, Pattern, Use, Defs, Rect} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const Icon = () => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns xlink="http://www.w3.org/1999/xlink">
        <Rect width="25" height="25" fill="url(#pattern0)"/>
        <Defs>
        <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <Use xlink href="#image0" transform="scale(0.02)"/>
        </Pattern>
        <Image id="image0" width="50" height="50" xlink href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QA/4ePzL8AAAJ0SURBVFjD5djLb01RFMfxT0O1hFRb5YqYGGlEiMSfIJ5BMZBg5jUSSsxKpIkJEgMR8WeIRxBCEFS13m3pRYjXgKHbUlkG2gHpue49vcfE3sOzz/6etdbvrLXX5v8aDVocdV6fL74p+KjPWYetV1eJ7WttcdkPkTAHXbRZdXrAJPu8F0LBFW3WalavWo3p5lrvkKu+C+GtvSakQazyUgj3bSvilAZbPRJCn2XlASY6LYTukl6sstwTIZxQUypipm7hq13GlfxZ1VoVhA65UpbPkRd6zS/bwYvkhT6z/25FXrijMZVUGnUKeTOKx6JbuG1yakXWuS3cKhab00JvSitGRpNXwrFk0YavKWLx55jvk/YkV70UdmWbn/YJXWWINsWo8U5Ymq0dm4XOMe9yQ6fpyY8vC1vHDOkQHidhGgwpVKA2NHkk9Jg52sN1wpWKuL0I5pjQVqHoJmLOC6srJqIEzAuhuYJaHRXzWWio6C8xCmZQlFSjbyQeKJLmvX8Myc5duewDn/tTwmuyRXBUOJAtghbharYI6g0ZMDVLBFwStmeb6n8VrS5V2RatX+V3edaNTqvwwPhsIRPlhd1Z27JCKFiQ5eEOTgnPTRsTYobXxY6p1Lov3B3Dgbteh3CzeDOU0y/cTWlNky6hv5iMR5qgfuG5hWUjFnsl9JpVyuKcTqGgtQxBV9tvQLhTvAH6PTYnhfDQyhKyQJWVngnheLmN9jIvhjvgneoTV02zw1Mh9FqS7jZit3fD9w7XHbTOPI0mqJXTbIN21wwJ4Y096S4LRnLaJheGtxptDjhnY2WSUZ3Vjjirx2eDCj7ocUa7FlP+r5usn4lLPDhrYgriAAAAAElFTkSuQmCC"/>
        </Defs>
    </Svg>
);

const Logout = () => (
    <View>
        <Icon />
    </View>
);

export default Logout;