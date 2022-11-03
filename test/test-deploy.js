const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const {json} = require("hardhat/internal/core/params/argumentTypes");

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async () => {
      simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
      simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async () => {
    const expectedValue = "0";
    const currentValue = await simpleStorage.retrieve();

      assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should add person with passed parameters to People array", async () => {
    const expectedName = "Ilya";
    const expectedNumber = "13";
    const expectedResult = '[{"type":"BigNumber","hex":"0x0d"},"Ilya"]';

    const transactionResponse = await simpleStorage.addPerson(expectedName, expectedNumber);
    await transactionResponse.wait(1);

    const people = await simpleStorage.people(0);
    assert.equal(JSON.stringify(people), expectedResult);
  })
});
