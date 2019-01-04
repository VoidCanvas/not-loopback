# not-loopback


This project is using loopback4 or loopback-next, long with typeorm. The mission is to get rid of repositories (Now you can do `model.save()`, don't judge me for that; it was seriously a pain to create repository for every model). Below is what this project does.

### Features
* No need to use loopback's default orm. It is using typeorm.
* No need to create repository for models. Models extended from `BaseEntity` will have `.save()` function with them; both for create and update.
* This gives you user management and auth support.
* Account controller takes care of registration and login.
* Check me-controller & role-capability-controller to find how auth works.
* You need to specify the capability to each authable rest api.
* One role has multiple capabilities. Check `role_capability_mapping` table.
* One user can have multiple roles. Check `user_role_mapping` table.

### How to install
* Clone it.
* In `datasources` folder provide your datasource details. All Models are by default linked with default datasource which is given in `config.json` file.
* `config.json` also has a api prefix url as `apiBasePath`.
* You can also explicitly mention a different datasource for any individual model.
* Run `script/scaffold/entities.sql` in your db. If you are not using postgres, modify the query as per your database query language.
* You can also run `src/migrations/role-capability-migration.ts` to initiate roles and capabilities as per `src/core/authentication/roles-enum.ts`. You can modify the enums `Role` and `Capability` if you want. Otherwise create new any time with apis of role-capability-controller.
* Run `npm install`.
* Run `npm start`.
* You should be able to access `localhost:3000` and `localhost:3000/explorer`.

> Feel free to raise issues.
