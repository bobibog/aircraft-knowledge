import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

// Stacked bar chart to display sentiment
export default class StackedBarChart extends React.Component {
  render() {
    return (
      <HSBar
        height={15}
        style={{ padding: 100 }}
        data={[
          { value: this.props.sentiment.positive, color: "#45de54" },
          { value: this.props.sentiment.neutral, color: "#e0e0e0" },
          { value: this.props.sentiment.negative, color: "#ff6666" }
        ]}
      />
    );
  }
}
