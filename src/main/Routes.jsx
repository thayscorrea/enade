import React from 'react'
// import { isAuthenticated } from "../services/auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CrawlerCrud from '../components/crawler/CrawlerCrud';

import CursosCrud from '../components/cursos/CursosCrud'
import Home from '../components/home/Home'
import QuestoesGabaritoCrud from '../components/questoes-gabaritos/QuestoesGabaritoCrud'
import UserCrud from '../components/user/UserCrud'
import RendimentoCrud from '../components/rendimento-alunos/RendimentoCrud'
import AvaliacaoProfessoresCrud from '../components/avaliacao-professores/AvalicaoProfessoresCrud'
import ProvaCrud from '../components/prova/ProvaCrud'

// import SignUp from '../pages/SignUp'
// import SignIn from '../pages/SignIn'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );

  const Routes = () => (
    // <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route path='/signup' component={SignUp} />
            <Route path='/login' component={SignIn} /> */}
            <Route path='/users' component={UserCrud} />
            <Route path='/questoes' component={QuestoesGabaritoCrud} />
            <Route path='/cursos' component={CursosCrud} />
            <Route path='/crawler' component={CrawlerCrud} />
            <Route path='/rendimento-alunos' component={RendimentoCrud} />
            <Route path='/avaliacao-professores' component={AvaliacaoProfessoresCrud} />
            <Route path='/prova' component={ProvaCrud} />
            <Redirect from='*' to='/' />


            {/* <PrivateRoute exact path='/' component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={SignIn} />
            <PrivateRoute path='/users' component={UserCrud} />
            <PrivateRoute path='/questoes' component={QuestoesGabaritoCrud} />
            <PrivateRoute path='/cursos' component={CursosCrud} />
            <Redirect from='*' to='/' /> */}
        </Switch>
    // </BrowserRouter>
);
  
export default Routes;