class A {
  constructor() {
      this.nameA = 'a'
  }
  validateA() {
      console.log("A")
  }
}

class B extends A {
  constructor() {
      super()
      this.nameB = 'b'
  }

  validateB() {
      console.log("B")
  }
}

class C extends B {
  constructor() {
      super()
      this.nameC = 'c'
  }

  validateC() {
      console.log("C")
  }
}

const c = new C();

const members = findMembers(c, 'name', 'validate');
console.log(members)

function findMembers(instance, fieldPrefix, functionPrefix){
  function _find(instance) {
    if(instance.__proto__ === null) {
      return []
    }

    // console.log('instance',instance)
    let names = Reflect.ownKeys(instance)
    names = names.filter(name => {
      return (name.startsWith(fieldPrefix) || name.startsWith(functionPrefix)) && true
    })
    return [...names, ..._find(instance.__proto__)]
  }

  return _find(instance)
}
