import { Stack, Fab, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CompositionSummary from "../components/Composition/CompositionSummary";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import EditComposition from "../components/Composition/EditComposition";
import SaveToServer from "../components/Composition/SaveToServer";
import LoadFromServer from "../components/Composition/LoadFromServer";
import { Box } from "@mui/system";

const Compositions = (props) => {
  let { goats, ...others } = props;

  const printRef = useRef();
  const [comps, setComps] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingComp, setEditingComp] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [savingToServer, setSavingToServer] = useState(false);
  const [loadingFromServer, setLoadingFromServer] = useState(false);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      loadFileData();
    }
  }, [firstLoad]);

  const handleClose = () => setEditing(false);
  const startEditing = (comp) => {
    if (comp) {
      setEditingComp(comp);
    }
    // New
    else
      setEditingComp({
        title: "",
        notes: "",
        tank1: { hero: "", player: "" },
        tank2: { hero: "", player: "" },
        dps1: { hero: "", player: "" },
        dps2: { hero: "", player: "" },
        heal1: { hero: "", player: "" },
        heal2: { hero: "", player: "" },
      });
    setEditing(true);
  };
  const handleSave = (editedComp) => {
    for (let comp in comps) {
      if (comps[comp].id === editedComp.id) {
        // Save edits
        comps[comp] = editedComp;
        saveFileData();
        return;
      }
    }

    // Save new comp
    setComps((old) => {
      let newData = [...old, { ...editedComp, id: Math.random() }];
      saveFileData(newData);
      return newData;
    });
  };
  const handleDelete = (compId) => {
    let newComps = [];
    for (let comp of comps) {
      if (comp.id !== compId) {
        newComps.push(comp);
      }
    }
    setComps(() => {
      saveFileData(newComps);
      return newComps;
    });
  };

  const loadFileData = () => {
    let compString = localStorage.getItem("compositions");
    let compObj = JSON.parse(compString);
    if (compObj) {
      setComps(compObj);
    } else {
      setComps([]);
    }
  };
  const saveFileData = (toSave = comps) => {
    localStorage.setItem("compositions", JSON.stringify(toSave));
  };

  return (
    <div>
      <Stack {...others} ref={printRef}>
        {comps.map((comp) => (
          <CompositionSummary
            key={comp.title}
            comp={comp}
            onEditClick={startEditing}
            onDeleteClick={handleDelete}
            goats={goats}
          />
        ))}
      </Stack>
      <Box
        sx={{
          position: "sticky",
          zIndex: 1000,
          bottom: "16px",
          right: "16px",
          backgroundColor: "white",
          width: "280px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: '8px',
          boxShadow: '0px 0px 5px',
          borderRadius: '20px'
        }}
      >
        <Fab
          color="primary"
          onClick={() => startEditing(null)}
          sx={{ marginRight: "8px" }}
        >
          <AddIcon />
        </Fab>
        <ReactToPrint
          trigger={() => {
            return (
              <Fab color="secondary" sx={{ marginRight: "8px" }}>
                <PrintIcon />
              </Fab>
            );
          }}
          content={() => printRef.current}
        />
        <Fab
          color="secondary"
          onClick={() => setSavingToServer(true)}
          sx={{ marginRight: "8px" }}
        >
          <SaveIcon />
        </Fab>
        <Fab
          color="secondary"
          onClick={() => setLoadingFromServer(true)}
          sx={{ marginRight: "8px" }}
        >
          <OpenInBrowserIcon />
        </Fab>
      </Box>
      <SaveToServer
        open={savingToServer}
        data={comps}
        handleClose={() => setSavingToServer(false)}
      />
      <LoadFromServer
        open={loadingFromServer}
        handleClose={() => setLoadingFromServer(false)}
        handleData={(data) => {
          setComps(JSON.parse(data));
          saveFileData(JSON.parse(data));
        }}
      />
      <EditComposition
        editing={editing}
        editingComp={editingComp}
        setEditingComp={setEditingComp}
        onSave={handleSave}
        onClose={handleClose}
      />
    </div>
  );
};

export default Compositions;