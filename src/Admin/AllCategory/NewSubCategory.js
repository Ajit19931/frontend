import React, { useEffect, useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, deleteSubCategory,getAdminMainCategory, getAdminSubCategory, newSubCategory } from '../../actions/categoryActions';
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
import { DELETE_SUBCATEGORIES_RESET, NEW_SUBCATEGORIES_RESET } from '../../constants/categoryConstant';
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


const NewSubCategory = () => {

  const [open, setOpen] = useState(false);



  const handleClickOpen = () => {
    setSubCategoryName("");
    setCategoryId("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { loading, categoryList } = useSelector((state) => state.allMainCategories);
  const { error, success } = useSelector((state) => state.newSubcate);
  const { subCategorys } = useSelector((state) => state.getSubcate);

  const { error: deleteError, isDeleted } = useSelector((state) => state.SubCategory);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState();


  const deleteSubCateHandler = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      dispatch(deleteSubCategory(id));
    }

  }

console.log(categoryList);

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
        toast.success("sub category delete successfully ", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch({ type: DELETE_SUBCATEGORIES_RESET });
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
      dispatch({ type: NEW_SUBCATEGORIES_RESET });
    }
    dispatch(getAdminSubCategory());
    dispatch(getAdminMainCategory());

  }, [dispatch, error, success,isDeleted , deleteError]);


  const Columns = [
    { field: "id", headerName: "Main CategoryID", minWidth: 100, flex: 0.3 },
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

  subCategorys && subCategorys.forEach((item) => {
    rows.push({
      id: item._id,

      name: item.subCategoryName,
      updatedAt: formatDate(item.updatedAt),

    });
  });



  const createCategorySubmit = (e) => {
    e.preventDefault();
    if (!subCategoryName.trim()) {
      toast.error("Please Enter Sub Category Name", {
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
    myForm.set("subCategoryName", subCategoryName);
    myForm.set("categoryId", categoryId);
    dispatch(newSubCategory(myForm));
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
      <MetaData tittle="Ecommerce | Admin Main category " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="d-flex justify-content-between mb-3 align-content-center">
            <h3 className="mb-2">All Sub Category</h3>
            <button className="btn-sm btn-success" onClick={handleClickOpen}>Add Sub Cat</button>
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
          {/* {params.id ?"Update Main Category":"Create new Main Category"} */}Create Sub Category
        </DialogTitle>
        <DialogContent dividers>
          <form className="modal-form p-2 pme-3" encType="multipart/form-data"
            onSubmit={createCategorySubmit}>
            <div className="form-group">
              <label className="form-label">Main Category Name</label>
              <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                <option value="main">Select Main cate</option>
                {categoryList && categoryList.map((cate )=>(
                  <option value={cate._id} >{cate.categoryName}</option>
               ) )}
              </select>
                
                </div>
            <div className="form-group">
              <label className="form-label">Sub Category Name</label>
              <input className="form-control"
                type="text" name="subCategoryName" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} /></div>
            <button className="form-btn" type="submit" >Submit</button>
          </form>
        </DialogContent>

      </Dialog>
      </>
      )}
      
    </>
  )
}


export default NewSubCategory