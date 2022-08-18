import React, { useEffect ,useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminMainCategory, newMainCategory } from '../actions/categoryActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { formatDate } from '../utils/functions';
// import { DELETE_PRODUCT_RESET } from '../constants/productConstant';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { NEW_MAINCATEGORIES_RESET } from '../constants/categoryConstant';

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


const NewCategory = () => {

    const [open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setCategoryName("");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const { error, categoryList ,success } = useSelector((state) => state.allcategories);

    // const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");

    const deleteProductHandler = (id) => {
        // dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        // if (deleteError) {
        //     toast.error(error);
        //     dispatch(clearErrors());
        // }
        // if (isDeleted) {
        //     toast.success("Product delete successfully ");
        //     dispatch({type: DELETE_PRODUCT_RESET});
        // }
        if (success) {
            toast.success("Category Created Successfully" , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            dispatch({ type: NEW_MAINCATEGORIES_RESET });
        }
        dispatch(getAdminMainCategory());

    }, [dispatch, error ,success]);

const createCategorySubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("categoryName", categoryName);
        myForm.set("categoryImage", categoryImage);
        dispatch(newMainCategory(myForm));
        handleClose();


    };

    const Columns = [
        { field: "id", headerName: "Main CategoryID", minWidth: 100, flex: 0.3 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 0.7 },

        { field: "updatedAt", headerName: "updatedAt", minWidth: 100, flex: 0.3 },

        {
            field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

                        <button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

                    </>
                )
            }
        },

    ]
    const rows = [];

    categoryList && categoryList.forEach((item) => {
        rows.push({
            id: item._id,

            name: item.categoryName,
            updatedAt: formatDate(item.updatedAt),

        });
    });

    return (
        <>
            <MetaData tittle="Ecommerce | Admin Main category " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <h3 className="mb-2">All Main Category</h3>
                        <buttons className="btn-sm btn-success" onClick={handleClickOpen}>Add Category </buttons>
                    </div>
                    <div className="row g-4">
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={Columns}
                                pageSize={7}
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
                    Add  Main Category
                </DialogTitle>
                <DialogContent dividers>
                    <form className="modal-form p-2 pme-3" encType="multipart/form-data"
                        onSubmit={createCategorySubmit}>
                        {/* <div className="col-lg-12 text-center">
                                        <div className="profile-image">
                                            <img src={avatarPreview} alt={user.name} className="rounded-circle" width={100} height={100} />

                                        </div>
                                    </div> */}
                        <div className="form-group">
                            <label className="form-label">Category image</label><input className="form-control h-100 "
                                type="file" value={categoryImage} onChange={(e) => setCategoryImage(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category Name</label>
                            <input className="form-control"
                                type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /></div>



                        <button className="form-btn" type="submit" >Submit</button>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default NewCategory