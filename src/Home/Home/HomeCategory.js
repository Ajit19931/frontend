import React from 'react';
import { Link } from 'react-router-dom';


const HomeCategory = () => {
    return (
        <>
            <section className="section newitem-part mt-4 shadow-sm bg-white   mx-2 ">

                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-lg-12 p-0 ">
                            <ul className="homecate py-2 pb-0">
                                <li> <Link className="cateimg" to={`/products`}>
                                    <img src={require('../../assets/images/category/1.png')} alt="category" />
                                </Link></li>

                                <li> <Link className="cateimg" to={`/products`}>
                                    <img src={require('../../assets/images/category/2.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/products`}>
                                    <img src={require('../../assets/images/category/3.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/products`}>
                                    <img src={require('../../assets/images/category/4.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/5.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/6.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/7.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/8.png')} alt="category" />
                                </Link></li>
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/9.png')} alt="category" />
                                </Link></li>
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/10.png')} alt="category" />
                                </Link></li>
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/11.png')} alt="category" />
                                </Link></li>

                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/12.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/13.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/14.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/15.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/16.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/17.png')} alt="category" />
                                </Link></li>
                                
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/18.png')} alt="category" />
                                </Link></li>
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/19.png')} alt="category" />
                                </Link></li>
                                <li> <Link className="cateimg" to={`/product`}>
                                    <img src={require('../../assets/images/category/20.png')} alt="category" />
                                </Link></li>
                            </ul>

                        </div>



                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeCategory