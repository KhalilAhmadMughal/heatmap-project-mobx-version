import { db } from "../config";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { clients, columns, dataSet, salesStatus } from "../helpers";

const StoreData = () => {
  // const [dataFromDB, setDataFromDB] = useState([]);
  const dataSetCollectionRef = collection(db, "dataSet");
  const salesStatusCollectionRef = collection(db, "salesStatus");
  const clientsCollectionRef = collection(db, "clients");
  const columnsCollectionRef = collection(db, "columns");

  // const addHeatmapDataToFireStore = () => {
  //   for (const item of dataSet) {
  //     const uploadItem = async () => {
  //       await addDoc(dataSetCollectionRef, {
  //         x: item.x,
  //         y: item.y,
  //         value: {
  //           statusTitle: item.value.statusTitle,
  //           statusValue: item.value.statusValue,
  //         },
  //       });
  //     };
  //     uploadItem();
  //   }
  // };

  const addHeatmapDataToFirestore = async () => {
    for (const item of dataSet) {
      const newItem = {
        x: item.x,
        y: item.y,
        value: {
          statusTitle: item.value.statusTitle,
          statusValue: item.value.statusValue,
        },
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(dataSetCollectionRef, newItem);
        console.log("Document added successfully:", newItem);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const addSalesStatusToFirestore = async () => {
    for (const item of salesStatus) {
      const newItem = {
        title: item.title,
        value: item.value,
        color: item.color,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(salesStatusCollectionRef, newItem);
        console.log("Document added successfully:", newItem);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const addClientsOrColumnsToFirestore = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    let items, collectionRef;
    const clickedButton = event.target as HTMLElement;
    if (clickedButton.id === "clients") {
      items = clients;
      collectionRef = clientsCollectionRef;
    } else {
      items = columns;
      collectionRef = columnsCollectionRef;
    }

    // console.log(items, collectionRef);

    for (const item of items) {
      const newItem = {
        title: item.title,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collectionRef, newItem);
        console.log("Document added successfully:", newItem);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDocs(dataSetCollectionRef);
  //     setDataFromDB(data.docs.map((doc) => ({ ...doc.data() })));
  //   };
  //   getData();
  // }, [dataFromDB, dataSetCollectionRef]);

  // console.log(dataFromDB.length !== 0 ? dataFromDB : "...loading data");

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Default data is stored!
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={addHeatmapDataToFirestore}
          disabled={false}
          style={{ width: "15rem", height: "2rem" }}
        >
          Upload dataSet to firebase
        </button>
        <button
          onClick={addSalesStatusToFirestore}
          disabled={false}
          style={{ width: "15rem", height: "2rem" }}
        >
          Upload salesStatus to firebase
        </button>
        <button
          id="clients"
          onClick={(e) => {
            addClientsOrColumnsToFirestore(e);
          }}
          disabled={false}
          style={{ width: "15rem", height: "2rem" }}
        >
          Upload clients to firebase
        </button>
        <button
          id="columns"
          onClick={(e) => {
            addClientsOrColumnsToFirestore(e);
          }}
          disabled={false}
          style={{ width: "15rem", height: "2rem" }}
        >
          Upload columns to firebase
        </button>
      </div>
    </div>
  );
};

export default StoreData;
