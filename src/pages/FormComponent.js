import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Table,
  Button,
  Spinner,
  Container,
} from "react-bootstrap";
import {
  calculateKmExpense,
  calculateSumForKey,
  calculateTotalHours,
  flattenNestedArray,
  getDatesForMonthYear,
} from "../utils/helperFunctions";
import CustomSelect from "../components/CustomSelect";
import CustomInput from "../components/CustomInput";
import TableHead from "../components/TableHead";
import { fetchData } from "../utils/api";

const FormComponent = () => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const SumOfAll = useMemo(() => {
    const SumOfPre = calculateSumForKey(formData, "premium");
    const SumOfSub = calculateSumForKey(formData, "subsistenceValue");
    const SumOfKms = calculateSumForKey(formData, "km_traveled");
    const SumOfKmsExpense = calculateSumForKey(formData, "km_expense");
    return [SumOfPre, SumOfSub, SumOfKms, SumOfKmsExpense];
  }, [formData]);
  const handleInputChange = (e, date, field) => {
    const updatedFormData = { ...formData };

    if (!updatedFormData[date]) {
      updatedFormData[date] = {};
    }
    updatedFormData[date][field] = e.target.value;

    if (field === "start_time" || field === "finish_time") {
      // If the changed field is start_time or finish_time, calculate total hours
      const startTime = updatedFormData[date]?.start_time || "";
      const finishTime = updatedFormData[date]?.finish_time || "";
      updatedFormData[date]["hours"] = calculateTotalHours(
        startTime,
        finishTime,
        date
      );
    }

    // Calculate km expense if both km_traveled and milage_rate are present
    if (field === "km_traveled" || field === "milage_rate") {
      const kmTraveled = updatedFormData[date]?.km_traveled || "";
      const milageRate = updatedFormData[date]?.milage_rate || "";

      updatedFormData[date]["km_expense"] = calculateKmExpense(
        kmTraveled,
        milageRate
      );
    }

    setFormData(updatedFormData);
  };

  const handleCheckboxChange = (date) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (updatedFormData[date]) {
        // If the date property exists, remove it (unchecked)
        delete updatedFormData[date];
      } else {
        // If the date property doesn't exist, add it (checked)
        updatedFormData[date] = {};
        updatedFormData[date].showRow = true; // You can set other properties as needed
      }

      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    // Handle the submitted data, for example, send it to an API or process it further
    console.log(formData);
  };
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData();
        setData(result);
       
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  //render of a row in table
  const renderRows = (month, year) => {
    const myDaysOfMonth = getDatesForMonthYear(month, year);
    return myDaysOfMonth.map((item) => (
      <tr key={item}>
        <td className="col-md-2 p-3">
          <Form.Check
            type="checkbox"
            checked={formData[item]?.showRow || false}
            onChange={() => handleCheckboxChange(item)}
              label={item}
          />
          {/* <FormLabel>{item}</FormLabel> */}
        </td>
        <td className="col-md-2">
          <CustomSelect
            onChange={(e) => handleInputChange(e, item, "type")}
            disabled={!formData[item]?.showRow}
            value={formData[item]?.type || ""}
            options={["off-site", "on-site"]}
          />
        </td>
        <td className="col-md-2">
          <CustomInput
            type="number"
            value={formData[item]?.premium || ""}
            onChange={(e) => handleInputChange(e, item, "premium")}
            disabled={
              formData[item]?.type !== "off-site" || !formData[item]?.showRow
            }
          />
        </td>
        <td className="col-md-2">
          <CustomInput
            type="text"
            value={formData[item]?.customer || ""}
            onChange={(e) => handleInputChange(e, item, "customer")}
            disabled={!formData[item]?.type || !formData[item]?.showRow}
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.trainingType || ""}
            onChange={(e) => handleInputChange(e, item, "trainingType")}
            disabled={!formData[item]?.type || !formData[item]?.showRow}
            options={flattenNestedArray(data.course)}
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.subsistenceType || ""}
            onChange={(e) => handleInputChange(e, item, "subsistenceType")}
            disabled={
              formData[item]?.type !== "off-site" || !formData[item]?.showRow
            }
            options={flattenNestedArray(data.subsistence_type)}
          />
        </td>

        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.subsistenceValue || ""}
            onChange={(e) => handleInputChange(e, item, "subsistenceValue")}
            disabled={
              formData[item]?.type !== "off-site" || !formData[item]?.showRow
            }
            options={flattenNestedArray(data.subsistence_rate)}
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.start_time || ""}
            onChange={(e) => handleInputChange(e, item, "start_time")}
            disabled={!formData[item]?.type || !formData[item]?.showRow}
            options={flattenNestedArray(data.start_time)}
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.finish_time || ""}
            onChange={(e) => handleInputChange(e, item, "finish_time")}
            disabled={!formData[item]?.type || !formData[item]?.showRow}
            options={flattenNestedArray(data.finish_time)}
          />
        </td>
        <td className="col-md-2">
          <CustomInput
            type="text"
            value={formData[item]?.hours || ""}
            onChange={(e) => handleInputChange(e, item, "hours")}
            // disabled={!formData[item]?.type ||!formData[item]?.showRow}
            disabled={true}
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.break_time || ""}
            onChange={(e) => handleInputChange(e, item, "break_time")}
            disabled={!formData[item]?.type || !formData[item]?.showRow}
            options={flattenNestedArray(data.break_time)}
          />
        </td>
        <td className="col-md-2">
          <CustomInput
            type="number"
            value={formData[item]?.km_traveled || ""}
            onChange={(e) => handleInputChange(e, item, "km_traveled")}
            disabled={
              formData[item]?.type !== "off-site" || !formData[item]?.showRow
            }
          />
        </td>
        <td className="col-md-2">
          <CustomSelect
            value={formData[item]?.milage_rate || ""}
            onChange={(e) => handleInputChange(e, item, "milage_rate")}
            disabled={
              formData[item]?.type !== "off-site" || !formData[item]?.showRow
            }
            options={flattenNestedArray(data.milage_rate)}
          />
        </td>
        <td className="col-md-2">
          <CustomInput
            type="number"
            value={formData[item]?.km_expense || ""}
            onChange={(e) => handleInputChange(e, item, "km_expense")}
            // disabled={formData[item]?.type !== "off-site"||!formData[item]?.showRow}
            disabled={true}
          />
        </td>
      </tr>
    ));
  };

  return (
    <React.Fragment>
      <Container style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Table striped bordered responsive>
          <TableHead />
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={14} align="center">
                  <Spinner style={{ width: "3rem", height: "3rem" }} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{renderRows(data.month[0], data.month[1])}</tbody>
          )}
          
        </Table>
       
      </Container>
     <table className="table"> 
      <tbody>
            <tr>
              <td colSpan={5} align="center">
                Total Premium: ${SumOfAll ? SumOfAll[0] : ""}
              </td>
              <td colSpan={2} align="center">
                Total Sub: ${SumOfAll ? SumOfAll[1] : ""}
              </td>
              {/* <td colSpan={4} align="center">
                Total Hour:{SumOfAll ? SumOfAll[2] : ""}
              </td> */}
              <td colSpan={8} align="end">
                Total:
                {SumOfAll
                  ? `Km's (${SumOfAll[2]}) / Expense(${SumOfAll[3]})`
                  : ""}
              </td>
            </tr>
          </tbody>
          </table>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
      >
        <Button onClick={handleSubmit} type="submit">Submit</Button>
      </div>
    </React.Fragment>
  );
};

export default FormComponent;
