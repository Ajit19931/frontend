import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getHomeSlider, deleteSlider } from '../actions/homeSliderActions';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { DELETE_SLIDER_RESET } from '../constants/homeSliderConstant';

const SliderList = () => {
  
    const dispatch = useDispatch();
    const { error, slider } = useSelector((state) => state.slider);
  
    const { error: deleteError, isDeleted } = useSelector((state) => state.delupSlider);
  
  
    const deleteSliderHandler = (id) => {
      dispatch(deleteSlider(id));
    }
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (deleteError) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (isDeleted) {
        toast.success("Slider deleted successfully ");
        dispatch({ type: DELETE_SLIDER_RESET });
      }
  
      dispatch(getHomeSlider());
  
    }, [dispatch, error, isDeleted, deleteError]);
  
    const Columns = [
      { field: "id", headerName: "Slider ID", minWidth: 100, flex: 0.3 },
      { field: "name", headerName: "Name", minWidth: 100, flex: 0.5 },
     
      { field: "amount", headerName: "Image", minWidth: 200, flex: 0.7, headerAlign: 'center', align: 'center',  renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.image && <img className="productListImg rounded" src={params.row.image} alt="" style={{ height: 40 }} />
              }
          </div>
        );
      }, },
  
      { field: "updatedAt", headerName: "Update At", minWidth: 100, flex: 0.3 },
  
      {
        field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, headerAlign: 'center', align: 'center', sortable: false,
        renderCell: (params) => {
          return (
            <>
              {/* <Link to={`/admin/updateslider/${params.getValue(params.id, "id")}`} className="me-4"><i className="fas fa-pen"></i></Link>
   */}
              <button onClick={() => deleteSliderHandler(params.getValue(params.id, "id"))}><i className="fas fa-trash"></i></button>
  
            </>
          )
        }
      },
  
    ]
    const rows = [];
  
    slider && slider.forEach((item) => {
      rows.push({
        id: item._id,
        image: item.images[0].url,
        name: item.name,
       
        updatedAt: String(item.updatedAt).substr(0, 10),
  
      });
    });
  
    return (
      <> <MetaData tittle="Ecommerce | Admin Slider " />
        <div className="content">
          <AdminHeader />
          <div className="container-fluid pt-4 px-4">
            <h3 className="mb-2">All Home Slider</h3>
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
      </>
    )
  }

export default SliderList