import { Chart } from "react-google-charts";

const Pie = ({ data, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Chart chartType="PieChart" data={data} width={"100%"} height={"400px"} />
    </div>
  );
};

export default Pie;
