SET GLOBAL local_infile = 1;
LOAD DATA LOCAL INFILE 'F:/OneDrive - De Vinci/Repos/JS/ReactNative/EcoHome/sql/test sql csv.csv'
    INTO TABLE ecohome.appareil
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\n';
