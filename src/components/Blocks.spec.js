import React from 'react';
import  Blocks from './Blocks';
import { create } from "react-test-renderer";

describe("<Blocks/>", () => {
  const data = [{
    attributes: {
      index:"1",
      data: "The human Torch"
    }},{
    attributes: {
      index:"2",
      data: "The human Torch"
    }

  }]

  it("should match snapshot", () => {
    const component = create(
      <Blocks data ={data} loading ={false}/>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  })
})
