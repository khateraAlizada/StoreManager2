import React from "react";
import axios from "axios";
import "./App.css";
import { Model, Shipment, Inventory, OverStock, Missing } from "./Model.js";

function App() {
  const [model, setModel] = React.useState(new Model());
  const updategGenerateInventory = () => {
    // go through and get all stores from the model
    let str = "";
    model.inventories.forEach((i) => {
      str +=
        "StoreID: " +
        i.storeID +
        " ,sku:  " +
        i.sku +
        ", quantiy: " +
        i.quantity +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storeInventory");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updategGenerateInventory();
  }, [model]);

  const createReport = (e) => {
    let arg1 = document.getElementById("storeID");
    let arg2 = document.getElementById("managerUserName");
    let arg3 = document.getElementById("managerPassword");

    document.getElementById("storeInventory").value = "Report created!";
  };

  const generateInventoryReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeID").value;
    let managerUserName = document.getElementById("managerUserName").value;
    let managerPassword = document.getElementById("managerPassword").value;
    //let quantity = document.getElementById("quantity").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
      managerUserName: managerUserName,
      managerPassword: managerPassword,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "generateInventory",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;
        model.inventories = [];

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].sku);
          model.inventories.push(
            new Inventory(list[i].storeID, list[i].sku, list[i].quantity)
          );
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };

  const updateShipments = () => {
    // go through and get all stores from the model
    let str = "";
    model.shipments.forEach((i) => {
      str += i.storeID + " = " + i.sku + i.quantity + "<br>";
    });
    //insert HTML in the <div> with
    // shipment-list
    let cd = document.getElementById("shipment-list");
    cd.innerHTML = str;
  };

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  // React.useEffect(() => {
  //   updateShipments();
  // }, [model]);

  // const insertShipments = (e) => {
  //   let arg1 = document.getElementById("storeID");
  //   let arg2 = document.getElementById("sku");
  //   let arg3 = document.getElementById("quantity");
  //   document.getElementById("result").value = "added";
  // };

  const processShipment = (e) => {
    // potentially modify the model
    let shipment = document.getElementById("shipment").value;
    //let quantity = document.getElementById("quantity").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = document.getElementById("shipment").value;
    let realData = JSON.parse(payload);
    // let payload = shipment;
    let msg = JSON.stringify(realData);
    // let msg = JSON.stringify(payload);
    console.log(msg);

    axios({
      method: "post",
      url: base_url + "processShipment",

      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //added

    //ended

    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    setModel(model.copy()); // this Triggers the redraw
  };

  const updateGenerateOverStock = () => {
    // go through and get all stores from the model
    let str = "";
    model.overStocks.forEach((i) => {
      str +=
        "StoreID: " +
        i.storeID +
        " ,sku:  " +
        i.sku +
        ", quantiy: " +
        i.quantity +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storeOverStock");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateGenerateOverStock();
  }, [model]);

  const createOverStockReport = (e) => {
    let arg1 = document.getElementById("storeIDOS");
    let arg2 = document.getElementById("managerUserNameOS");
    let arg3 = document.getElementById("managerPasswordOS");

    document.getElementById("storeOverStock").value =
      "OverStock Report created!";
  };

  const generateOverStockReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeIDOS").value;
    let managerUserName = document.getElementById("managerUserNameOS").value;
    let managerPassword = document.getElementById("managerPasswordOS").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
      managerUserName: managerUserName,
      managerPassword: managerPassword,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "overStockReport",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;
        model.overStocks = [];

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].sku);
          model.overStocks.push(
            new OverStock(list[i].storeID, list[i].sku, list[i].quantity)
          );
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };

  const updategGenerateMissing = () => {
    // go through and get all stores from the model
    let str = "";
    model.missings.forEach((i) => {
      str +=
        "sku:  " +
        i.sku +
        ", name; " +
        i.name +
        ", description: " +
        i.description +
        ", price: " +
        i.price +
        ", maxQ: " +
        i.maxQ +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storeMissing");
    cd.innerHTML = str;
  };
  React.useEffect(() => {
    updategGenerateMissing();
  }, [model]);

  const createMissingReport = (e) => {
    let arg1 = document.getElementById("storeIDM");
    let arg2 = document.getElementById("managerUserNameM").value;
    let arg3 = document.getElementById("managerPasswordM").value;

    document.getElementById("storeMissing").value =
      "Missing or sold out Report created!";
  };

  const generateMissingReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeIDM").value;
    let managerUserName = document.getElementById("managerUserNameM").value;
    let managerPassword = document.getElementById("managerPasswordM").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
      managerUserName: managerUserName,
      managerPassword: managerPassword,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "missingItems",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        // console.log(response.result);
        console.log(response.data.result);
        const list = response.data.result;
        console.log(model.missings);
        model.missings = [];

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].sku);

          model.missings.push(
            new Missing(
              list[i].sku,
              list[i].name,
              list[i].description,
              list[i].price,
              list[i].maxQ
            )
          );
        }

        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };

  // const updategGenerateMissing = () => {
  //   // go through and get all stores from the model
  //   let str = "";
  //   model.missingss.forEach((i) => {
  //     str +=
  //       "StoreID: " +
  //       i.storeID +
  //       " ,sku:  " +
  //       i.sku +
  //       ", quantiy: " +
  //       i.quantity +
  //       " ,aisle:  " +
  //       i.aisle +
  //       ",shelf:  " +
  //       i.shelf +
  //       "<br>";
  //   });
  //   //insert HTML in the <div> with

  //   // storeInventory
  //   let cd = document.getElementById("storeMissing");
  //   cd.innerHTML = str;
  // };

  const fillShelf = (e) => {
    // let arg1 = document.getElementById("storeID");
    // document.getElementById("storeMissing").value =
    //  "Missing or sold out Report created!";
  };

  // const generateMissingReport = (e) => {
  //   // potentially modify the model
  //   let storeID = document.getElementById("storeID").value;
  //   //let quantity = document.getElementById("quantity").value;

  //   var base_url =
  //     "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

  //   let payload = {
  //     storeID: storeID,
  //   };
  //   let msg = JSON.stringify(payload);

  //   axios({
  //     method: "post",
  //     url: base_url + "generateMissingReport",
  //     data: {
  //       body: msg,
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response.data.result);
  //       const list = response.data.result;

  //       for (let i = 0; i < list.length; i++) {
  //         console.log(list[i].sku);
  //         model.missings.push(
  //           new Missing(
  //             list[i].storeID,
  //             list[i].sku,
  //             list[i].quantity,
  //             list[i].aisle,
  //             list[i].shelf
  //           )
  //         );
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   // clear inputs

  //   setModel(model.copy()); // this Triggers the redraw
  // };

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  //  <table className="table table-bordered">
  //       <tr>
  //         <th>storeID</th>
  //         <th>sku</th>
  //         <th>quantity</th>
  //       </tr>

  //       {shipment.map((item, index) => (
  //         <tr data-index={index}>
  //           <td>{item.storeID}</td>
  //           <td>{item.sku}</td>
  //           <td>{item.quantity}</td>
  //         </tr>
  //       ))}
  //     </table>
  //     <button onClick={(e) => processShipment()}> Process Shipment </button>
  //     result: <input id="shipment-result" readOnly />
  //     <div id="shipment-list"></div>
  // idstore: <input id="idstore" />
  //Store Inventory: <p id="storeInventory"></p>
  // Store Inventory: <p id="storeInventory"></p>
  // <button onClick={(e) => generateInventoryReport()}>
  //   {" "}
  //   Generate Inventory{" "}
  // </button>;
  //<div id="shipment-list"></div>

  return (
    <div className="App">
      <h1>Welcome to Manager Page</h1>
      storeID: <input id="storeID" />
      managerUserName: <input id="managerUserName" />
      managerPassword: <input id="managerPassword" />
      <button onClick={(e) => generateInventoryReport()}>
        Generate Inventory
      </button>
      <div id="storeInventory"></div>
      <p></p>
      managerUserName: <input id="managerUserNameOS" />
      managerPassword: <input id="managerPasswordOS" />
      storeID: <input id="storeIDOS" />
      <button onClick={(e) => generateOverStockReport()}>
        Generate OverStock
      </button>
      <div id="storeOverStock"></div>
      <p></p>
      shipment: <textarea id="shipment" />
      <button onClick={(e) => processShipment()}>Process Shipment</button>
      <p></p>
      storeID: <input id="storeIDM" />
      managerUserName: <input id="managerUserNameM" />
      managerPassword: <input id="managerPasswordM" />
      <button onClick={(e) => generateMissingReport()}>
        Generate Missing Items
      </button>
      <div id="storeMissing"></div>
      <p></p>
      storeID: <input id="storeIDFillShelf" />
      <button onClick={(e) => fillShelf()}>Fill Shelf</button>
      <div id="fillShelves"></div>
    </div>
  );
}

export default App;
