import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Grid, Heading, InfiniteScroll, Menu, RoutedButton, Text,
} from 'grommet';
import {
  Cli as Console, Location, Power, StatusCriticalSmall, StatusGoodSmall, User,
} from 'grommet-icons';

import Context from '../Context';
import Reference from '../components/Reference';

const StatusIcon = ({ status }) => (status === 'OK'
  ? <StatusGoodSmall size="small" color="status-ok" />
  : <StatusCriticalSmall size="small" color="status-critical" />
);

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default () => (
  <Context.Consumer>
    {({
      cards, version, model, onLogout,
    }) => (
      <Box fill background="light-2">
        <Box
          flex={false}
          tag="header"
          direction="row"
          justify="between"
          align="center"
          pad="small"
        >
          <Heading margin="none" size="small">
            Server
          </Heading>
          <Menu
            label="Power Options"
            icon={<Power />}
            items={[
              { label: 'Hard Reset' },
            ]}
          />
        </Box>
        <Box flex margin="large" overflow="auto">
          <Grid columns="small" gap="small">
            {cards ? (
              <InfiniteScroll items={cards}>
                {card => (
                  <Box
                    key={card.name}
                    basis="small"
                    round="xsmall"
                    overflow="hidden"
                  >
                    <RoutedButton
                      path={`/${card.name}`}
                      fill
                      hoverIndicator
                    >
                      <Box
                        pad="medium"
                        background={{ color: 'white', opacity: true }}
                      >
                        <Box direction="row" gap="small">
                          {card.Icon && <card.Icon />}
                          <Text><strong>{card.name}</strong></Text>
                        </Box>
                        {card.Status && (
                          <Box direction="row" gap="small">
                            <Text>{card.Status.State}</Text>
                            <StatusIcon status={card.Status.Health} />
                          </Box>
                        )}
                        {card.value && (
                          <Box
                            margin={{ top: 'medium' }}
                            border="top"
                            pad={{ top: 'small' }}
                            direction="row"
                            align="end"
                            gap="small"
                          >
                            <Reference
                              reference={card.value.reference}
                              placeholder={(
                                <Text size="xxlarge" color="light-3">.</Text>
                              )}
                            >
                              {data => (
                                <Text size="xxlarge">
                                  <strong>{data}</strong>
                                </Text>
                              )}
                            </Reference>
                            <Text size="small" color="light-6">
                              {card.value.units}
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </RoutedButton>
                  </Box>
                )}
              </InfiniteScroll>
            ) : (
              <Box margin="medium" pad="large" background="light-1" />
            )}
          </Grid>
        </Box>

        <Box
          flex={false}
          tag="footer"
          direction="row"
          justify="between"
          align="center"
          pad="small"
          background="neutral-1"
        >
          <Reference reference={version}>
            {data => <Text>{data}</Text>}
          </Reference>
          <Reference reference={model}>
            {data => <Text>{data}</Text>}
          </Reference>
          <Box direction="row">
            <Button icon={<Location />} onClick={() => {}} />
            <Button icon={<Console />} onClick={() => {}} />
            <Menu
              dropAlign={{ right: 'right' }}
              icon={<User />}
              items={[
                { label: 'Logout', onClick: onLogout },
              ]}
            />
          </Box>
        </Box>
      </Box>
    )}
  </Context.Consumer>
);
