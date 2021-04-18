import Image from 'next/image'
import adminStyle from '../styles/admin.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faBookReader, faChalkboardTeacher, faFile, faFileAlt, faFileInvoice, faFolder, faCopy} from '@fortawesome/free-solid-svg-icons'

export default function AdminSidebar() {

    return (
        <nav className="col-md-3 col-lg-2 d-md-block sidebar">
            <div className="d-flex flex-column p-3 text-primary">
                <a className="navbar-brand text-center" href="/">
                    <Image src="/images/ifbavca.png" className="d-inline-block align-text-top" alt="Logo" width={140} height={40} priority={true} />
                </a>
                <ul className="nav nav-pills flex-column mb-auto text-primary ">
                    <li>
                        <a href="#" className="nav-link text-primary sidebar-item">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faChartLine} className="sm-icon"/>
                            </i>                     
                            <label className={adminStyle.sidebarLabel}>Dashboard</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faBookReader} className="sm-icon"/>
                            </i>                     
                            <label className={adminStyle.sidebarLabel}>Cursos</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faChalkboardTeacher} className="sm-icon"/>
                            </i>                     
                            <label className={adminStyle.sidebarLabel}>Docentes</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary ">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faFile} className="sm-icon"/>     
                            </i>                                       
                            <label className={adminStyle.sidebarLabel}>Posts</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary ">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faFileAlt} className="sm-icon"/>  
                            </i>                                          
                            <label className={adminStyle.sidebarLabel}>Trabalhos</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary ">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faFileInvoice} className="sm-icon"/>  
                            </i>                                          
                            <label className={adminStyle.sidebarLabel}>Baremas</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary ">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faFolder} className="sm-icon"/>  
                            </i>                                          
                            <label className={adminStyle.sidebarLabel}>Processos Seletivos</label>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-primary ">
                            <i className={adminStyle.icon}>
                                <FontAwesomeIcon icon={faCopy} className="sm-icon"/>  
                            </i>                                          
                            <label className={adminStyle.sidebarLabel}>Relatórios</label>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}