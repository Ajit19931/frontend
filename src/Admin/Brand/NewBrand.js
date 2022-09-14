import React, { useEffect, useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, deleteBrand,getAdminBrand,  newBrand } from '../../actions/brandActions';
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
import { DELETE_BRAND_RESET, NEW_BRAND_RESET } from '../../constants/brandConstant';
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


const NewBrand = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setBrandName("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { loading, brands } = useSelector((state) => state.getbrand);
  const { error, success } = useSelector((state) => state.newbrand);

  const { error: deleteError, isDeleted } = useSelector((state) => state.brand);

  const [brandName, setBrandName] = useState("");
  // const [categoryId, setCategoryId] = useState();


  const deleteBrandHandler = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      dispatch(deleteBrand(id));
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
        toast.success("brand delete successfully ", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch({ type: DELETE_BRAND_RESET });
    }

    if (success) {
      toast.success("Brand Created Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch({ type: NEW_BRAND_RESET });
    }
    dispatch(getAdminBrand());

  }, [dispatch, error, success,isDeleted , deleteError]);


  const Columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.7 },

    { field: "updatedAt", headerName: "updatedAt", minWidth: 100, flex: 0.3 },

    {
      field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/updatebrand/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

            <button onClick={() => deleteBrandHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

          </>
        )
      }
    },

  ]
  const rows = [];

  brands && brands.forEach((item) => {
    rows.push({
      id: item._id,

      name: item.brandName,
      updatedAt: formatDate(item.updatedAt),

    });
  });



  const createBrandSubmit = (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      toast.error("Please Enter Brand Name", {
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
    myForm.set("brandName", brandName);

    dispatch(newBrand(myForm));
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
      <MetaData tittle="Ecommerce | Admin brands " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="d-flex justify-content-between mb-3 align-content-center">
            <h3 className="mb-2">All Brands</h3>
            <button className="btn-sm btn-success" onClick={handleClickOpen}>Add brand</button>
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
          {/* {params.id ?"Update Main Category":"Create new Main Category"} */}Create Brands
        </DialogTitle>
        <DialogContent dividers>
          <form className="modal-form p-2 pme-3" encType="multipart/form-data"
            onSubmit={createBrandSubmit}>
            
            <div className="form-group">
              <label className="form-label">brand Name</label>
              <input className="form-control"
                type="text" name="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} /></div>
            <button className="form-btn" type="submit" >Submit</button>
          </form>
        </DialogContent>

      </Dialog>
      </>
      )}
      
    </>
  )
}

export default NewBrand