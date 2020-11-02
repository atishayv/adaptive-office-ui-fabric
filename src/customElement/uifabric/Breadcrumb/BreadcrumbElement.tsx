
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import * as React from "react";

export const getBreadCrumbElement = (items: string): JSX.Element => {
    return (
        <Breadcrumb items={JSON.parse(items)}/>
    );
}