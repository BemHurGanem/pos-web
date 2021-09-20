import Head from 'next/head'
import style from '../styles/docentes.module.css'
import { GetStaticProps } from 'next'
import React from 'react'
import SiteHeader from '../components/site-header'
import Image from 'next/image'
import { Teacher } from '../models/teacher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import TeacherService from '../lib/teacher.service'

export default function Docentes({ docentes }) {

  const listaDocentes: Teacher[] = docentes;

  return (
    <>
      <Head>
        <title>Pos Web - Docentes</title>
      </Head>
      <SiteHeader></SiteHeader>
      <main className={style.main}>
        <section>
          <div className="row h-100 justify-content-center">
            <div className="col-md-5 col-xl-4 col-xxl-3 d-flex justify-content-center align-items-center">
              <div className="p-4">
                <h1 className="text-primary-dark mt-4 title-sm-font-size">Nossa</h1>
                <h1 className="text-primary-dark title-sm-font-size">Equipe</h1>
              </div>
            </div>
            <div className="col-md-5 col-xl-4 col-xxl-3 d-flex justify-content-center align-items-center">
              <div className="p-4">
                <h5 className="text-primary-dark mt-4">Conheça a equipe de docentes por trás da nossa pós graduação Lato Sensu em Desenvolvimento Web do IFBA - Vitória da Conquista.</h5>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="row h-100 justify-content-center mt-5 pb-5">
            <div className="col-11 col-md-10 col-xl-8 col-xxl-7">
              <div className="row justify-content-center">
                {listaDocentes.map((docente, i) => {
                  return (
                    <div className="col-sm-6 col-md-4 col-xl-4" key={i}>
                      <div className={style.card + ' card mt-3 mt-md-2'}>
                        <div className="card-body text-center mb-3">
                          {docente.photo ? 
                            <Image src={docente.photo} className={style.avatar + ''} alt="Foto do docente" width={150} height={150} /> : <></>
                          }
                          <h5 className="card-title mt-4 text-primary-dark ">{docente.name}</h5>
                          <p className="card-text mt-4 text-primary-dark ">{docente.about}</p>

                          <a target="_blank" rel="noopener noreferrer" href={'tel:'+docente.phone} className=" mt-4 d-block">
                            <FontAwesomeIcon icon={faPhoneAlt} size="sm" className="sm-icon  mr-2"/>
                            {docente.phone}
                          </a>

                          <a target="_blank" rel="noopener noreferrer" href={'mailto:'+docente.email} className=" mt-2 d-block">
                            <FontAwesomeIcon icon={faEnvelope} size="sm" className="sm-icon mr-2" />
                            {docente.email}
                          </a>

                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </section>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const teacherService = TeacherService();

  const docenteList = await teacherService.getAll();


  return {
    props: {
      docentes: docenteList
    },
    revalidate: 86400
  }
}
