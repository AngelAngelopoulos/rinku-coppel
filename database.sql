IF db_id('rinku') IS NULL 
    CREATE DATABASE rinku

GO
-- Declare database to use
USE rinku;

-- Disable constraints for all tables in the database:
EXEC sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'

-- Drop the table if it already exists and Create table
IF OBJECT_ID('[dbo].[Workdays]', 'U') IS NOT NULL
DROP TABLE [dbo].[Workdays]
GO

-- Drop the table if it already exists and Create table
IF OBJECT_ID('[dbo].[Employees]', 'U') IS NOT NULL
DROP TABLE [dbo].[Employees]
GO

-- Drop the table if it already exists and Create table
IF OBJECT_ID('[dbo].[Taxes]', 'U') IS NOT NULL
DROP TABLE [dbo].[Taxes]
GO

-- Drop the table if it already exists and Create table
IF OBJECT_ID('[dbo].[Roles]', 'U') IS NOT NULL
DROP TABLE [dbo].[Roles]
GO

-- Drop the table if it already exists and Create table
IF OBJECT_ID('[dbo].[Payments]', 'U') IS NOT NULL
DROP TABLE [dbo].[Payments]
GO

CREATE TABLE Taxes(
    ID INTEGER NOT NULL PRIMARY KEY,
    TaxesPercentage FLOAT NOT NULL DEFAULT 9.0,
    LimitSalary FLOAT NOT NULL DEFAULT 100000.00,
    Extra FLOAT NOT NULL DEFAULT 3.0,
);

CREATE TABLE Payments(
    ID INTEGER NOT NULL PRIMARY KEY,
    BasicSalary FLOAT NOT NULL DEFAULT 30.00,
    WorkHours INTEGER NOT NULL DEFAULT 8,
    WorkDays INTEGER NOT NULL DEFAULT 6,
    ExtraPayment FLOAT NULL DEFAULT 5.00,
    Bonus FLOAT NULL DEFAULT 10.00,
    FoodSupportPercentage FLOAT NOT NULL DEFAULT 4.00
);

CREATE TABLE Roles(
    ID INTEGER NOT NULL PRIMARY KEY,
    Name VARCHAR(20) NOT NULL DEFAULT 'chofer',
);

CREATE TABLE Employees(
    ID INTEGER NOT NULL IDENTITY(1, 1) PRIMARY KEY, 
    Name VARCHAR(40) NOT NULL, 
    Surname VARCHAR(40) NOT NULL,
    RoleID INTEGER NOT NULL FOREIGN KEY REFERENCES Roles(ID),
    TaxID INTEGER NOT NULL FOREIGN KEY REFERENCES Taxes(ID),
    PaymentID INTEGER NOT NULL FOREIGN KEY REFERENCES Payments(ID),
);

CREATE TABLE Workdays(
    ID INTEGER NOT NULL IDENTITY(1, 1) PRIMARY KEY ,
    EmployeeID INTEGER NOT NULL FOREIGN KEY REFERENCES Employees(ID) ON DELETE CASCADE,
    Month INTEGER NOT NULL,
    Year INTEGER NOT NULL,
    Deliveries INTEGER NOT NULL,
    GrossSalary FLOAT NOT NULL,
    NetSalary FLOAT NOT NULL,
    Taxes FLOAT NOT NULL,
    FoodSupportPayment FLOAT NOT NULL,
    BonusTotalPayment FLOAT NOT NULL,
    DeliveriesTotalPayment FLOAT NOT NULL
);

-- Re-enable constraints for all tables in the database:
EXEC sp_msforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL'

-----------------------------/////////////////////////  FILL THE DATABASE DEFAULT VALUES  /////////////////////////////-----------------------------------------------------------

-- Create a new stored procedure called 'initTables' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'initTables'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.initTables
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.initTables

AS
BEGIN
    INSERT INTO Taxes ( [ID] ) VALUES ( 1 );
    INSERT INTO Roles ( [ID], Name ) VALUES ( 1, 'chofer' ), ( 2, 'cargador' ), ( 3, 'auxiliar' );
    INSERT INTO Payments ( [ID], Bonus ) VALUES ( 1, 0.00 ), ( 2, 5.00 ), ( 3, 10.00 );
END
GO

-----------------------------/////////////////////////  SELECT ONE EMPLOYEE BY ID  /////////////////////////////-----------------------------------------------------------


-- Create a new stored procedure called 'selectEmployee' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'selectEmployee'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.selectEmployee
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.selectEmployee
    @ID INTEGER = NULL
AS
BEGIN
    SELECT erp.*, t.LimitSalary, t.TaxesPercentage, t.Extra FROM Taxes t JOIN (SELECT er.*, p.BasicSalary, p.Bonus, p.ExtraPayment, p.FoodSupportPercentage, p.WorkDays, p.WorkHours FROM Payments p JOIN 
    (SELECT e.*, r.Name as RoleName FROM Employees e JOIN Roles r ON e.RoleID = r.ID WHERE e.ID = @ID) er 
    ON p.ID = er.PaymentID) erp ON erp.TaxID = t.ID ORDER BY erp.Surname, erp.Name
END
GO

-----------------------------/////////////////////////  SELECT ALL EMPLOYEES WITH THE SAME ROLE  /////////////////////////////-----------------------------------------------------------


-- Create a new stored procedure called 'selectAllFromRole' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'selectAllFromRole'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.selectAllFromRole
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.selectAllFromRole
    @Role /*parameter name*/ VARCHAR(20) /*datatype_for_param1*/ = NULL /*default_value_for_param1*/
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    IF @Role IS NULL
        SELECT erp.*, t.LimitSalary, t.TaxesPercentage, t.Extra FROM Taxes t JOIN (SELECT er.*, p.BasicSalary, p.Bonus, p.ExtraPayment, p.FoodSupportPercentage, p.WorkDays, p.WorkHours FROM Payments p JOIN 
        (SELECT e.*, r.Name as RoleName FROM Employees e JOIN Roles r ON e.RoleID = r.ID) er 
        ON p.ID = er.PaymentID) erp ON erp.TaxID = t.ID ORDER BY erp.Surname, erp.Name
    ELSE
        SELECT erp.*, t.LimitSalary, t.TaxesPercentage, t.Extra FROM Taxes t JOIN (SELECT er.*, p.BasicSalary, p.Bonus, p.ExtraPayment, p.FoodSupportPercentage, p.WorkDays, p.WorkHours FROM Payments p JOIN 
        (SELECT e.*, r.Name as RoleName FROM Employees e JOIN Roles r ON e.RoleID = r.ID WHERE r.Name = @Role) er 
        ON p.ID = er.PaymentID) erp ON erp.TaxID = t.ID ORDER BY erp.Surname, erp.Name
END
GO

-----------------------------/////////////////////////  CREATE NEW EMPLOYEE  /////////////////////////////-----------------------------------------------------------


-- Create a new stored procedure called 'createNewEmployee' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'createNewEmployee'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.createNewEmployee
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.createNewEmployee
    @Name VARCHAR(40),
    @Surname VARCHAR(40),
    @RoleID INTEGER,
    @PaymentID INTEGER,
    @TaxID INTEGER
AS
BEGIN
    INSERT INTO Employees ( Name, Surname, RoleID, PaymentID, TaxID ) VALUES (@Name, @Surname, @RoleID, @PaymentID, @TaxID);
    DECLARE @ID INTEGER = SCOPE_IDENTITY();
    EXECUTE selectEmployee @ID
END
GO

-----------------------------/////////////////////////  CREATE NEW WORKDAY  /////////////////////////////-----------------------------------------------------------


-- Create a new stored procedure called 'createNewJourney' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'createNewWorkday'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.createNewWorkday
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.createNewWorkday
    @EmployeeID INTEGER,
    @Month INTEGER,
    @Year INTEGER,
    @Deliveries INTEGER,
    @GrossSalary FLOAT, 
    @NetSalary FLOAT, 
    @Taxes FLOAT, 
    @FoodSupportPayment FLOAT,
    @BonusTotalPayment FLOAT,
    @DeliveriesTotalPayment FLOAT
AS
BEGIN
    INSERT INTO Workdays ( EmployeeID, Month, Year, Deliveries, GrossSalary, NetSalary, Taxes, FoodSupportPayment, BonusTotalPayment, DeliveriesTotalPayment ) VALUES ( @EmployeeID, @Month, @Year, @Deliveries, @GrossSalary, @NetSalary, @Taxes, @FoodSupportPayment, @BonusTotalPayment, @DeliveriesTotalPayment )
    SELECT * FROM Workdays w WHERE w.ID = SCOPE_IDENTITY();
END
GO

-----------------------------/////////////////////////  EDIT EMPLOYEE  /////////////////////////////-----------------------------------------------------------


-- Create a new stored procedure called 'editEmployee' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'editEmployee'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.editEmployee
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.editEmployee
    @EmployeeID INTEGER,
    @RoleID INTEGER,
    @Name VARCHAR(40),
    @Surname VARCHAR(40)
AS
BEGIN
    UPDATE Employees SET RoleID = @RoleID, Name = @Name, Surname = @Surname WHERE ID = @EmployeeID
    EXECUTE selectEmployee @EmployeeID
END
GO



-- Create a new stored procedure called 'selectAllWorkdaysFromEmployee' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'selectAllWorkdaysFromEmployee'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.selectAllWorkdaysFromEmployee
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.selectAllWorkdaysFromEmployee
    @EmployeeID INTEGER
AS
BEGIN
    SELECT * FROM Workdays w WHERE w.EmployeeID = @EmployeeID
END
GO

-- Create a new stored procedure called 'deleteEmployee' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'deleteEmployee'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.deleteEmployee
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.deleteEmployee
   @EmployeeID INTEGER
AS
BEGIN
   DELETE FROM Employees WHERE ID = @EmployeeID
   EXECUTE selectEmployee @EmployeeId
END
GO



-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.createNewEmployee 'Luis', 'Hernandez', 3, 1, 1;
-- GO

-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.selectAllFromRole ;
-- GO

-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.editEmployee 1  2 'Angel' 'Alvarado'
-- GO

-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.selectEmployee 1
-- GO

-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.createNewWorkday 1, 2, 2023, 12, 0, 0, 0, 0, 0, 0
-- GO

-- -- example to execute the stored procedure we just created
-- EXECUTE dbo.selectAllWorkdaysFromEmployee 1 
-- GO

-- example to execute the stored procedure we just created
EXECUTE dbo.initTables
GO

-- example to execute the stored procedure we just created
EXECUTE dbo.deleteEmployee 2
GO


PRINT('DATABASE CREATED')

-- SELECT * FROM Taxes;

-- SELECT * FROM Roles;

-- SELECT * FROM Payments;

-- SELECT * FROM Employees;

-- SELECT * FROM Workdays;