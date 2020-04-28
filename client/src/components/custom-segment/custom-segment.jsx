import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";

const CustomSegment = ({ page, icon, header, children }) => (
  <div className={page && "page " + page}>
    <Header as="h2" icon={icon ? true : false} textAlign="center">
      {icon && <Icon name={icon} circular />}
      {header}
    </Header>

    <Segment placeholder children={children} />
  </div>
);

export default CustomSegment;
