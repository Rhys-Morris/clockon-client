import React from "react";
import {} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import applicationColors from "../style/colors";
import { inputFormattedToday, msToFormattedTime } from "../helpers/date";
import { workPeriodsForInvoice } from "../data/api";
import { convertWorkToHours, totalIncome } from "../helpers/helper";
import CurrencyContext from "../contexts/currencyContext";

// Register font
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

// Reference font
const styles = StyleSheet.create({
  wrapper: {
    fontFamily: "Roboto",
  },
});

const PDF = ({
  companyName,
  companyAddress,
  dueDate,
  clientName,
  clientEmail,
  clientContact,
  workPeriods,
  currency,
}) => {
  return (
    <Document style={styles.wrapper}>
      <Page
        size="A4"
        style={{ display: "flex", direction: "column", padding: "10px" }}
      >
        <Text
          style={{
            color: applicationColors.SOFT_ERROR_COLOR,
            fontSize: "40px",
            letterSpacing: "5px",
            fontWeight: "bold",
            alignSelf: "flex-end",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          INVOICE
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          <View>
            {/* Personal */}
            <View>
              {companyName !== "empty" && <Text>{companyName}</Text>}
              {companyAddress !== "empty" && <Text>{companyAddress}</Text>}
            </View>
            {/* Client */}
            <View style={{ marginTop: "30px" }}>
              <Text
                style={{
                  color: applicationColors.DARK_LIGHT_BLUE,
                  marginBottom: "5px",
                }}
              >
                Bill to:
              </Text>
              <Text style={{ marginBottom: "5px" }}>{clientName}</Text>
              {clientContact !== "empty" && (
                <Text style={{ marginBottom: "5px" }}>{clientContact}</Text>
              )}
              {clientEmail !== "empty" && <Text>{clientEmail}</Text>}
            </View>
          </View>
          {/* Invoice Details */}
          <View>
            <Text style={{ marginBottom: "5px" }}>
              Invoice Date:{" "}
              {new Date(inputFormattedToday()).toLocaleString().split(",")[0]}
            </Text>
            <Text style={{ marginBottom: "5px" }}>
              Date Due: {new Date(dueDate).toLocaleString().split(",")[0]}
            </Text>
            <Text
              style={{
                marginTop: "80px",
                fontSize: "20px",
                padding: "5x",
                backgroundColor: "#eeeeff",
              }}
            >
              Total: {currency[currency.length - 1]}
              {workPeriods && totalIncome(workPeriods).toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Work Period Rows */}
        <View
          style={{
            margin: "0 10px",
            marginTop: "50px",
          }}
        >
          {/* Header */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: "14px",
              borderBottom: "1px solid rgba(0, 0,0, .2)",
              backgroundColor: "#eeeeff",
              padding: "3px",
              paddingBottom: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ marginRight: "15px", width: "75px" }}>Date</Text>
              <Text style={{ flex: "1" }}>Work Description</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ marginRight: "20px", width: "125px" }}>Time</Text>
              <Text style={{ width: "60px" }}>Fee</Text>
            </View>
          </View>
          {workPeriods &&
            workPeriods.map((wp, index) => (
              <View
                key={wp.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  padding: "5px 3px",
                  borderBottom: "1px solid rgba(0, 0,0, .2)",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ marginRight: "15px", width: "75px" }}>
                    {new Date(wp.end_time).toLocaleString().split(",")[0]}
                  </Text>
                  <Text
                    style={{
                      flex: "1",
                    }}
                  >
                    {wp.title.length > 40
                      ? wp.title.slice(0, 40) + "..."
                      : wp.title}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ marginRight: "20px", width: "125px" }}>
                    {msToFormattedTime(wp.end_time - wp.start_time)}
                  </Text>
                  <Text style={{ width: "60px" }}>
                    {`${currency[currency.length - 1]}${(
                      convertWorkToHours([workPeriods[index]]) * wp.project_rate
                    ).toFixed(2)}`}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

PDF.propTypes = {
  dueDate: PropTypes.string,
  clientContact: PropTypes.string,
  clientEmail: PropTypes.string,
  clientName: PropTypes.string,
  companyName: PropTypes.string,
  companyAddress: PropTypes.string,
  workPeriods: PropTypes.array,
  currency: PropTypes.string,
};

const Invoice = () => {
  // Get query params out of url
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const projectId = query.get("projectId");
  const dueDate = query.get("dueDate");
  const clientName = query.get("client");
  const clientEmail = query.get("clientEmail");
  const clientContact = query.get("clientContact");
  const companyName = query.get("company");
  const companyAddress = query.get("address");
  const [workPeriods, setWorkPeriods] = React.useState(null);
  const { currency } = React.useContext(CurrencyContext);

  // Get Work Periods to Invoice
  React.useEffect(() => {
    workPeriodsForInvoice(projectId).then((data) => {
      if (data.work_periods) setWorkPeriods(data.work_periods);
    });
  }, []);

  console.log(workPeriods);
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <PDF
        dueDate={dueDate}
        clientName={clientName}
        clientContact={clientContact}
        clientEmail={clientEmail}
        companyName={companyName}
        companyAddress={companyAddress}
        workPeriods={workPeriods}
        currency={currency}
      />
    </PDFViewer>
  );
};

export default Invoice;
