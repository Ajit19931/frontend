import React, { useEffect, useState } from 'react'
import "../../assets/css/profile.css"
import MetaData from "../MetaData";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../../component/Loading";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

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



const Profile = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const { user, loading } = useSelector((state) => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile updated successfully ");
            dispatch(loadUser());
            navigate("/profile");
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, error, isUpdated, navigate, user]);
    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        handleClose();
       
    };

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };

    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData title={`${user.name}'s Profile`} />
                    <section className="inner-section profile-part mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h4>Your Profile</h4><button onClick={handleClickOpen}>edit
                                                profile</button>
                                        </div>
                                        <div className="account-content">
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <div className="profile-image">
                                                        <img src={user.avatar && user.avatar.url} alt={user.name} className="rounded-circle" width={100} height={100} />

                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-3">
                                                    <div className="form-group"><label className="form-label">name</label>
                                                        <input
                                                            className="form-control" type="text" readOnly={true} value={user.name} /></div>
                                                </div>
                                                <div className="col-md-4 col-lg-3">
                                                    <div className="form-group"><label className="form-label">Email</label><input
                                                        className="form-control" type="email" readOnly={true} value={user.email} /></div>
                                                </div>
                                                <div className="col-md-4 col-lg-2">
                                                    <div className="form-group"><label className="form-label">Joined Date</label><input
                                                        className="form-control" type="email" readOnly={true} value={String(user.createdAt).substr(0, 10)} /></div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div className="profile-btn"><Link to="/password/updatepassword">change pass.</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h4>contact number</h4><button data-bs-toggle="modal" data-bs-target="#contact-add">add
                                                contact</button>
                                        </div>
                                        <div className="account-content">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card contact active">
                                                        <h6>primary</h6>
                                                        <p>+8801838288389</p>
                                                        <ul>
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#contact-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card contact">
                                                        <h6>secondary</h6>
                                                        <p>+8801941101915</p>
                                                        <ul>
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#contact-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card contact">
                                                        <h6>secondary</h6>
                                                        <p>+8801747875727</p>
                                                        <ul>
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#contact-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h4>delivery address</h4><button data-bs-toggle="modal" data-bs-target="#address-add">add
                                                address</button>
                                        </div>
                                        <div className="account-content">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card address active">
                                                        <h6>Home</h6>
                                                        <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                                        <ul className="user-action">
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#address-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card address">
                                                        <h6>Office</h6>
                                                        <p>east tejturi bazar, dhaka-1200. word no-04, road no-13/c, house no-4/b</p>
                                                        <ul className="user-action">
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#address-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4 alert fade show">
                                                    <div className="profile-card address">
                                                        <h6>Bussiness</h6>
                                                        <p>kawran bazar, dhaka-1100. word no-02, road no-13/d, house no-7/m</p>
                                                        <ul className="user-action">
                                                            <li><button className="edit icofont-edit" title="Edit This"
                                                                data-bs-toggle="modal" data-bs-target="#address-edit"></button></li>
                                                            <li><button className="trash icofont-ui-delete" title="Remove This"
                                                                data-bs-dismiss="alert"></button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <div>

                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Edit Profile Info
                            </DialogTitle>
                            <DialogContent dividers>
                                <form className="modal-form p-2 pme-3" encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}>
                                    <div className="col-lg-12 text-center">
                                        <div className="profile-image">
                                            <img src={avatarPreview} alt={user.name} className="rounded-circle" width={100} height={100} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">profile image</label><input className="form-control h-100 "
                                            type="file" onChange={updateProfileDataChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">name</label><input className="form-control"
                                            type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                                    <div className="form-group">
                                        <label className="form-label">email</label>
                                        <input className="form-control"
                                            type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                                    <button className="form-btn" type="submit" >save
                                        profile info</button>
                                </form>
                            </DialogContent>

                        </Dialog>
                    </div>
                </>)}
        </>
    )
}

export default Profile