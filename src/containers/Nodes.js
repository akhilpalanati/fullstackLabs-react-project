import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkNodeStatuses } from "../actions/nodes";
import { getBlockContent }from "../actions/blocks";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.nodes.list);
  }

  toggleNodeExpanded(node) {
    const { expandedNodeURL} = this.state;
    this.setState({
      expandedNodeURL:
        node.url === expandedNodeURL ? null : node.url,
    }, () => {
      if (!(node.url === expandedNodeURL)) {
        // making api call on each expand because i want to fetch the latest blocks
        this.props.actions.getBlockContent(node)
      }

    });
  }

  render() {
    const { nodes } = this.props;

    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.list.map((node) => (
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded}
          />
        ))}
      </Box>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ checkNodeStatuses, getBlockContent }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
