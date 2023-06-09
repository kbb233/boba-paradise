import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {GridToolbar } from "@mui/x-data-grid";
import OrderDataService from "../../service/order.service"

import Header from "../../components/Header";

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {

    const data = 
    { 
      recipe: '', 
      price:0.0, 
      status: true 
    }
    OrderDataService.create(data).then( res => {
      const order = res.data;
      setRows((oldRows) => [...oldRows, order]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [order.id]: { mode: GridRowModes.Edit },
      }));
    }).catch (error => {
      console.log(error)
    })

  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Orders () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    OrderDataService.getAll().then(res => {
      setRows(res.data);
    })
  }, []);


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    OrderDataService.delete(id).then(res => {
      setRows(rows.filter((row) => row.id !== id));
    }).catch(error => {
      console.log(error);
    })
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    OrderDataService.update(updatedRow.id, updatedRow).then(res => {
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    }).catch(error => {
      console.log(error);
    })
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100, },
    { field: "order_date", headerName: "order_date", width: 100,  editable: true},
    { field: "phone_number", headerName: "phone_number", width: 100,  editable: true},
    { field: "customer_comments", headerName: "customer_comments", headerAlign: "left", align: "left", width: 200, editable: true },
    { field: "status", headerName: "status", width: 100, editable: true}, 
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orders" subtitle="welcome to Orders" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGridPro
         rows={rows}
         columns={columns}
         editMode="row"
         rowModesModel={rowModesModel}
         onRowModesModelChange={handleRowModesModelChange}
         onRowEditStart={handleRowEditStart}
         onRowEditStop={handleRowEditStop}
         processRowUpdate={processRowUpdate}
         slots={{
           toolbar: EditToolbar,
         }}
         slotProps={{
           toolbar: { setRows, setRowModesModel },
         }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

