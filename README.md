# grommet-redfish

This is a grommet based application using a redfish API endpoint.

To run this application, execute the following commands:

  1. Install NPM modules

    ```
    $ npm install (or yarn install)
    ```

  2. Start the front-end dev server:

    ```
    $ npm run start
    ```

  3. Create the app distribution to be used by a back-end server

    ```
    $ npm run build
    ```

  4. Test and run linters:

    ```
    $ npm run check
    ```

## Notes

- hierarchical virtual data object, lazily loaded
- UI descriptors with references to paths in the data object
- Server: holds the retrieved back-end data, dataIds, references
- Reference: asks server for reference data, which will be loaded if needed
