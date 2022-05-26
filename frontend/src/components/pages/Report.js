import { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { productReport } from "./../api/productReport";
import { userInfo } from "./../../utils/Auth";
import Layout from "../Layout";
function Report() {
  const [values, setValues] = useState([]);
  useEffect(function () {
    const { token } = userInfo();
    productReport(token)
      .then((response) => {
        setValues(response.data.data);
      })
      .catch((err) => {});
  }, []);
  //function ReportFn
  function ReportFn() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table_columnHeaddata">Year</th>
            <th className="table_columnHeaddata">Jan</th>
            <th className="table_columnHeaddata">Feb</th>
            <th className="table_columnHeaddata">Mar</th>
            <th className="table_columnHeaddata">Apr</th>
            <th className="table_columnHeaddata">May</th>
            <th className="table_columnHeaddata">Jun</th>
            <th className="table_columnHeaddata">Jul</th>
            <th className="table_columnHeaddata">Aug</th>
            <th className="table_columnHeaddata">Sep</th>
            <th className="table_columnHeaddata">Oct</th>
            <th className="table_columnHeaddata">Nov</th>
            <th className="table_columnHeaddata">Dec</th>
          </tr>
        </thead>
        <tbody>
          {values.map(function (el, i) {
            return (
              <tr key={Math.random() + i + "report"}>
                <td className="table_columnddata">{el.year}</td>
                <td className="table_columnddata">{el.jan}</td>
                <td className="table_columnddata">{el.feb}</td>
                <td className="table_columnddata">{el.mar}</td>
                <td className="table_columnddata">{el.april}</td>
                <td className="table_columnddata">{el.may}</td>
                <td className="table_columnddata">{el.jun}</td>
                <td className="table_columnddata">{el.jul}</td>
                <td className="table_columnddata">{el.aug}</td>
                <td className="table_columnddata">{el.sep}</td>
                <td className="table_columnddata">{el.oct}</td>
                <td className="table_columnddata">{el.nov}</td>
                <td className="table_columnddata">{el.dec}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  return (
    <Layout title="Purchase Report">
      <Container>
        <Row>
          <Col>{ReportFn()}</Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default Report;
