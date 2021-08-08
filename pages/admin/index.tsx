import { GetServerSidePropsContext,  InferGetServerSidePropsType } from 'next'
import React from 'react'
import AdminBase from '../../components/admin/admin-base'
import { UserType } from "../../enum/type-user.enum";
import Permission from "../../lib/permission.service";

export default function Admin(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
        <AdminBase />
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const permission = Permission();
  return await permission.checkPermission(ctx, [UserType.MASTER, UserType.ADMIN]);
};
