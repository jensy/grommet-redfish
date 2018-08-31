import React, { Component } from 'react';
import {
  Action, Calculator, Capacity, Host, LocationPin, Shield, Sort, User,
} from 'grommet-icons';

import Context from './Context';

const get = url => fetch(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    // 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json());

/* eslint-disable react/no-unused-state */
export default class Server extends Component {
  state = {
    session: true, // simulate while developing
    model: 'Chassis.Members.Model',
    version: 'Managers.Members.FirmwareVersion',
    cards: [
      { name: 'System', Icon: Host },
      { name: 'Sessions', Icon: User },
      { name: 'Logs', Icon: Sort },
      { name: 'Security', Icon: Shield },
      {
        name: 'Memory',
        Icon: Capacity,
        value: {
          reference: 'Systems.Members.MemorySummary.TotalSystemMemoryGiB',
          units: 'GiB',
        },
      },
      {
        name: 'Processor',
        Icon: Calculator,
      },
      {
        name: 'Power',
        Icon: Action,
        value: {
          reference: 'Chassis.Members.Power.PowerControl.PowerMetrics.AverageConsumedWatts',
          units: 'Watts',
        },
      },
      {
        name: 'Temperature',
        Icon: LocationPin,
        value: {
          reference: 'Chassis.Members.Thermal.Temperatures.ReadingCelsius',
          aggregate: 'max',
          // Math.max.apply(
          // Math,
          // endpoints.Chassis.Members[0].Thermal.Temperatures
          //   .map(temp => temp.ReadingCelsius)
          // ),
          units: 'Celsius',
        },
      },
    ],
    dataIds: {}, // for @odata.ids we've loaded
  }

  loading = {} // not in state because it doesn't affect rendering

  references = {} // for references we've loaded

  componentDidMount() {
    this.setState({
      getReference: this.getReference,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
    });
    get('/redfish/v1/')
      .then(root => this.setState({ root }));
  }

  getData = (parts, dataNode) => {
    const { dataIds } = this.state;
    const part = parts[0];

    let nextNode = dataNode[part];
    if (Array.isArray(nextNode)) {
      [nextNode] = nextNode; // only get the first item in an array for now
    }

    const dataId = nextNode['@odata.id'];
    if (dataId) {
      if (dataIds[dataId]) {
        nextNode = dataIds[dataId];
      } else {
        if (!this.loading[dataId]) {
          this.loading[dataId] = true;
          get(dataId).then((data) => {
            this.loading[dataId] = false;
            const { dataIds: prevDataIds } = this.state;
            const nextDataIds = { ...prevDataIds };
            nextDataIds[dataId] = data;
            this.setState({ dataIds: nextDataIds });
          });
        }
        // need to wait until we load this before we can proceed
        return undefined;
      }
    }
    if (parts.length > 1) {
      return this.getData(parts.slice(1), nextNode);
    }
    return nextNode;
  }

  getReference = (reference) => {
    const { root } = this.state;
    if (this.references[reference]) {
      return this.references[reference];
    }
    if (root) {
      const parts = reference.split('.');
      const referenceData = this.getData(parts, root);
      if (referenceData) {
        this.references[reference] = referenceData;
        return referenceData;
      }
    }
    return undefined;
  }

  onLogin = (UserName, Password) => {
    const { root } = this.state;
    fetch(`${root.SessionService['@odata.id']}Sessions/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserName, Password }),
    })
      .then(response => response.json())
      .then(() => this.setState({ session: { UserName } }))
      .then(() => console.log('!!! Signed in as', UserName))
      .catch(error => console.error(error));
  }

  onLogout = () => {
    this.setState({ session: undefined });
  }

  render() {
    return (
      <Context.Provider value={this.state} {...this.props} />
    );
  }
}
