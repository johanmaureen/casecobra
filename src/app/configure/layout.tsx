//import MaxWidthWrapper from '@/components/Max'
//import Steps from '@/components/Steps'
import { ReactNode } from "react";
import MaxWidtWrapper from "../components/MaxWidtWrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidtWrapper className="flex-1 flex flex-col">{children}</MaxWidtWrapper>
  );
};

export default Layout;
//<Steps />
