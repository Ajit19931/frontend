import React, { useEffect, useState } from 'react'
// import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminCategory, addCategory } from '../actions/categoryActions';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Loader from "../component/Loading";
import { NEW_CATEGORIES_RESET } from '../constants/categoryConstant';

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

const AllCategoryList = () => {

    const [open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const { error, categoryList, loading, isAdded } = useSelector((state) => state.allcategories);

    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");


    // const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

    //   const deleteProductHandler = (id) => {
    //       // dispatch(deleteProduct(id));
    //   }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        // if (deleteError) {
        //     toast.error(error);
        //     dispatch(clearErrors());
        // }
        if (isAdded) {
            toast.success("Category Added successfully ");
            dispatch({ type: NEW_CATEGORIES_RESET });
        }

        dispatch(getAdminCategory());

    }, [dispatch, error, isAdded]);

    const createCategorySubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", categoryName);
        myForm.set("parentId", parentCategoryId);
        myForm.set("categoryImage", categoryImage);
        dispatch(addCategory(myForm));
        handleClose();


    };

    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData tittle="Ecommerce | Admin Category " />
                    <div className="content">
                        <AdminHeader />
                        <div className="container-fluid pt-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <h3 className="mb-2">All Category</h3>
                                <button className=" btn-sm btn-success" onClick={handleClickOpen}>Add Category</button>
                            </div>
                            <div className="row g-4 ">


                                <div className="col-sm-12 col-xl-12">
                                    <div className="bg-white shadow-sm rounded h-100 p-4">
                                        <ul>
                                            {categoryList && categoryList.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h6 >{item.name}</h6>
                                                        {
                                                            item.children.map((subitem, index) => {
                                                                return (
                                                                    <ul key={subitem.name}>
                                                                        <li key={index} >{subitem.name}</li>
                                                                        {
                                                                            subitem.children.map((subsubitem, index) => {
                                                                                return (
                                                                                    <ul key={subsubitem.name}><li key={index} className="text-primary" >{subsubitem.name}</li>

                                                                                    </ul>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                            )
                                            }


                                        </ul>
                                    </div>
                                </div>




                            </div>
                        </div>
                        <AdminFooter />
                    </div>

                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Add Category
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
                                        type="text" name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /></div>
                                <div className="form-group">
                                    <label className="form-label">name</label>
                                    <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)} >
                                        <option value="h">Select Category</option>
                                        {categoryList && categoryList.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}

                                                    </option>
                                                    {
                                                        item.children.map((subitem, index) => {
                                                            return (

                                                                <option key={subitem._id} value={subitem._id}>{subitem.name}</option>



                                                            )
                                                        })
                                                    }
                                                </>

                                            )
                                        }
                                        )
                                        }

                                    </select>
                                </div>


                                <button className="form-btn" type="submit" >Submit</button>
                            </form>
                        </DialogContent>

                    </Dialog>
                </>)}

        </>
    )
}

export default AllCategoryList