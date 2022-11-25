import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider ,{Search}from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { Button } from "react-bootstrap";

const { SearchBar } = Search;

let PharmacynameFilter;
let PharmacyemailFilter;
let PharmacyLocationFilter;
// let originFilter;

const ClearButton = props => {
  const handleClick = () => {
    props.onSearch("");
    props.clearAllFilter();
  };
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      style={{
        fontSize: "16px",
        padding: "5px",
        margin: "10px",
        height: "40px"
      }}
    >
      Clear
    </Button>
  );
};

class PatientSearchPharmacy extends React.Component {
  columns = [
    {
      dataField: "PharmacyName",
      text: "PharmacyName",
      filter: textFilter({
        getFilter: filter => {
          PharmacynameFilter = filter;
        }
      })
    },
    {
      dataField: "PharmacyEmailid",
      text: "PharmacyEmailid",
      filter: textFilter({
        getFilter: filter => {
          PharmacyemailFilter = filter;
        }
      }),
      sort: true
    },
    {
      dataField: "PharmacyLocation",
      text: "PharmacyLocation",
      filter: textFilter({
        getFilter: filter => {
          PharmacyLocationFilter = filter;
        }
      })
    },
    // {
    //   dataField: "origin",
    //   text: "Origin",
    //   filter: textFilter({
    //     getFilter: filter => {
    //       originFilter = filter;
    //     }
    //   })
    // }
  ];

  clearAllFilter() {
    PharmacynameFilter("");
    PharmacyemailFilter("");
    PharmacyLocationFilter("");
    // stockFilter("");
  }

  products = [
    {
      PharmacyName: "appolo",
      PharmacyEmailid:"apoolo@gmail.com",
      PharmacyLocation:"delhi"
    },
    {
      PharmacyName: "Max",
      PharmacyEmailid:"Max@gmail.com",
      PharmacyLocation:"Banglore"
    },
    {
      PharmacyName: "Good Pharmacy",
      PharmacyEmailid:"Good@gmail.com",
      PharmacyLocation:"Mumbai"
    }
  ];

  render() {
    return (
      <div align="center">
        <br></br>
        <h1>Pharmacy Details</h1>
        <ToolkitProvider
          bootstrap4
          keyField="name"
          data={this.products}
          columns={this.columns}
          search
        >
          {props => (
            <div align="center">
              <SearchBar
                {...props.searchProps}
                style={{ width: "400px", height: "40px" }}
              />
              <ClearButton
                {...props.searchProps}
                clearAllFilter={this.clearAllFilter}
              />
              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                noDataIndication="There is no solution"
                striped
                hover
                condensed
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default PatientSearchPharmacy;
