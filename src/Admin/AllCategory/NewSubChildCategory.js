import React, { useEffect, useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, deleteChildSubCategory,getAdminChildSubCategory, getAdminSubCategory, newchildSubCategory } from '../../actions/categoryActions';
import { toast } from 'react-toastify';
import MetaData from '../../component/MetaData.js';
import AdminHeader from '../AdminHeader';
import AdminFooter from '../AdminFooter';
import { formatDate } from '../../utils/functions';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DELETE_CHILDSUBCATEGORIES_RESET, NEW_CHILDSUBCATEGORIES_RESET } from '../../constants/categoryConstant';
import { Link } from 'react-router-dom';
import Loader from '../../component/Loading';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const NewSubChildCategory = () => {

  const [open, setOpen] = useState(false);



  const handleClickOpen = () => {
    setChildSubCategoryName("");
    setSubCategoryId("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { loading, subCategorys } = useSelector((state) => state.getSubcate);
  const { error, success } = useSelector((state) => state.newchildSubcate);
  const { childsubCategorys } = useSelector((state) => state.getChildSubcate);

  const { error: deleteError, isDeleted } = useSelector((state) => state.ChildSubCategory);

  const [childSubCategoryName, setChildSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState();


  const deleteSubCateHandler = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      dispatch(deleteChildSubCategory(id));
    }

  }



  useEffect(() => {

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(error, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch(clearErrors());
    }
    if (isDeleted) {
        toast.success("child sub category delete successfully ", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch({ type: DELETE_CHILDSUBCATEGORIES_RESET  });
    }

    if (success) {
      toast.success("Category Created Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch({ type: NEW_CHILDSUBCATEGORIES_RESET });
    }
    dispatch(getAdminSubCategory());
    dispatch(getAdminChildSubCategory());

  }, [dispatch, error, success,isDeleted , deleteError]);


  const Columns = [
    { field: "id", headerName: "CategoryID", minWidth: 100, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.7 },

    { field: "updatedAt", headerName: "updatedAt", minWidth: 100, flex: 0.3 },

    {
      field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/updatesubcategory/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

            <button onClick={() => deleteSubCateHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

          </>
        )
      }
    },

  ]
  const rows = [];

  childsubCategorys && childsubCategorys.forEach((item) => {
    rows.push({
      id: item._id,

      name: item.childSubCategoryName,
      updatedAt: formatDate(item.updatedAt),

    });
  });



  const createCategorySubmit = (e) => {
    e.preventDefault();
    if (!childSubCategoryName.trim()) {
      toast.error("Please Enter Sub child Category Name", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;

    }
    const myForm = new FormData();
    myForm.set("childSubCategoryName", childSubCategoryName);
    myForm.set("subCategoryId", subCategoryId);
    dispatch(newchildSubCategory(myForm));
    handleClose();

  };
  // const registerDataChange = (e) => {
  //     debugger;
  //     if (e.target.name === "categoryImage") {
  //         const reader = new FileReader();

  //         reader.onload = () => {
  //             if (reader.readyState === 2) {
  //                 setCategoryImage(reader.result);
  //                 setCategoryImgPreview(reader.result);
  //             }
  //         };

  //         reader.readAsDataURL(e.target.files[0]);
  //     } 


  // };

  return (
    <>
     {loading ? (<Loader />) :
                (<>
      <MetaData tittle="Ecommerce | Admin child Sub category " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="d-flex justify-content-between mb-3 align-content-center">
            <h3 className="mb-2">All child Sub Category</h3>
            <button className="btn-sm btn-success" onClick={handleClickOpen}>Add child Sub </button>
          </div>
          <div className="row g-4">
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={Columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick

              />
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Create Child Sub Category
        </DialogTitle>
        <DialogContent dividers>
          <form className="modal-form p-2 pme-3" encType="multipart/form-data"
            onSubmit={createCategorySubmit}>
            <div className="form-group">
              <label className="form-label">Sub Category Name</label>
              <select className="form-control" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} >
                <option value="main">Select Sub cate</option>
                {subCategorys && subCategorys.map((cate )=>(
                  <option value={cate._id} >{cate.subCategoryName}</option>
               ) )}
              </select>
                
                </div>
            <div className="form-group">
              <label className="form-label">child Sub Category Name</label>
              <input className="form-control"
                type="text" name="childSubCategoryName" value={childSubCategoryName} onChange={(e) => setChildSubCategoryName(e.target.value)} /></div>
            <button className="form-btn" type="submit" >Submit</button>
          </form>
        </DialogContent>

      </Dialog>
      </>
      )}
      
    </>
  )
}


export default NewSubChildCategory